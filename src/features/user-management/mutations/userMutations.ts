import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../../../shared/services/api";
import { userKeys } from "../queries/userQueries";
import { CreateUserRequest, User } from "../types/user.types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserRequest>({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: userApi.deleteUser,
    onMutate: (userId) => {
      const previousUsers =
        queryClient.getQueryData<User[]>(userKeys.lists()) || [];

      queryClient.setQueryData<User[]>(userKeys.lists(), (old = []) =>
        old.filter((user) => user.id !== userId)
      );

      return { previousUsers };
    },
    onError: (err, userId, context: any) => {
      console.error("Error deleting user:", err);

      if (context?.previousUsers) {
        queryClient.setQueryData(userKeys.lists(), context.previousUsers);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
