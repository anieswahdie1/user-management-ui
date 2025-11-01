import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { userFormSchema } from "../schemas/user.schema";
import { UserFormData } from "../types/user.types";

export const useUserForm = () => {
  return useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });
};
