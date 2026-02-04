import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
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

  // تسجيل الدخول
  const login = async (email: string, password: string): Promise<User> => {
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

      //check thats all of role small later
      foundUser.role = foundUser.role.toLowerCase();

      setUser(foundUser);
      localStorage.setItem("clinic_user", JSON.stringify(foundUser));

      return foundUser;
    } catch (err: any) {
      throw new Error(err.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  //  logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("clinic_user");
    window.location.href = "/login";
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
    }),
    [user, loading],
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
