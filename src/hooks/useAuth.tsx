import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import api from "../api/axiosInstance";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("clinic_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("clinic_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      try {
        const [patientsRes, doctorsRes, adminsRes] = await Promise.all([
          api.get("/patients"),
          api.get("/doctors"),
          api.get("/admins"),
        ]);

        const allUsers: User[] = [
          ...patientsRes.data,
          ...doctorsRes.data,
          ...adminsRes.data,
        ];

        const foundUser = allUsers.find(
          (u) => u.email === email && u.password === password,
        );

        if (!foundUser)
          throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");

        const sanitizedUser = {
          ...foundUser,
          role: foundUser.role.toLowerCase(),
        };

        setUser(sanitizedUser);
        localStorage.setItem("clinic_user", JSON.stringify(sanitizedUser));
        return sanitizedUser;
      } catch (err: any) {
        throw new Error(err.message || "حدث خطأ أثناء تسجيل الدخول");
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("clinic_user");
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
    }),
    [user, loading, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
