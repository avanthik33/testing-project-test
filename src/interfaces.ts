import { ReactNode } from "react";

export interface signinFormData {
  email: string;
  password: string;
}

export interface submitData {
  url: string;
  method: "POST";
  body: any;
  header?: Record<string, string>;
}

export interface ErrorProps {
  message: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
}

export interface Products {
  name: string;
  description: string;
}

export interface ProductsProps {
  products: Products[];
}

export interface ProtectedRouteProps {
  children: ReactNode;
}
