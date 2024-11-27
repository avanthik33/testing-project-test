import { SignUpFormData } from "./interfaces";

export const validateUserInput = ({
  username,
  email,
  password,
  phone,
  confirmPassword,
}: SignUpFormData) => {
  if (!username) {
    alert("Username is required.");
    return false;
  } else if (username.length < 3) {
    alert("Username must be at least 3 characters long.");
    return false;
  }
  if (!email) {
    alert("Email is required.");
    return false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  if (!phone) {
    alert("Phone number is required.");
    return false;
  } else if (!/^\d+$/.test(phone)) {
    alert("Phone number must only contain digits.");
    return false;
  } else if (phone.length < 10) {
    alert("Phone number must be at least 10 digits long.");
    return false;
  }

  if (!password) {
    alert("Password is required.");
    return false;
  } else if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  }
  if (password !== confirmPassword) {
    alert("password and confirm password in not match!");
    return false;
  }
  return true;
};
