export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UserFormData {
  name: string;
  email: string;
}

export interface UserTableProps {
  users: User[];
  onDeleteUser: (userId: number) => void;
  isDeleting: boolean;
}

export interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  isSubmitting: boolean;
}

export interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
  isDeleting: boolean;
}

export interface UserTableSkeletonProps {
  rows?: number;
}
