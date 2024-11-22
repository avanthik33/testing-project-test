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
  confirmPassword: string;
}
