import { useQuery } from "@tanstack/react-query";

import { userApi } from "../../../shared/services/api";
import { QUERY_CONFIG } from "../../../shared/utils/constants";
import { User } from "../types/user.types";
import { mockUsers } from "../utils/mockData";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      try {
        const data = await userApi.getUsers();
        return data;
      } catch (error) {
        console.warn("API failed, using mock data:", error);
        return mockUsers;
      }
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.CACHE_TIME,
    retry: QUERY_CONFIG.RETRY,
  });
};
