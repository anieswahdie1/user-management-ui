import { User } from "../types/user.types";

export const formatUserData = (users: User[]): User[] => {
  return users.map((user) => ({
    ...user,
    name: user.name?.trim() || "Unknown",
    email: user.email?.trim() || "No email",
    company: {
      ...user.company,
      name: user.company.name?.trim() || "No company",
    },
  }));
};

export const getUserInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
