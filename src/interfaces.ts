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
