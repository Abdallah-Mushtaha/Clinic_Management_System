import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001/departments";

export function useDepartments() {
  const queryClient = useQueryClient();

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string | null; data: any }) => {
      return id
        ? axios.put(`${API_URL}/${id}`, data)
        : axios.post(API_URL, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("تمت العملية بنجاح");
    },
    onError: () => toast.error("حدث خطأ في الاتصال"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("تم الحذف");
    },
    onError: () => toast.error("فشل الحذف"),
  });

  return {
    departments,
    isLoading,
    saveDepartment: saveMutation.mutateAsync,
    deleteDepartment: deleteMutation.mutateAsync,
  };
}
