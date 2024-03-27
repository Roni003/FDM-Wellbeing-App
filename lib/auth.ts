import { Alert } from "react-native";
import { supabase } from "./Supabase";

export function validatePassword(val: string): boolean {
  if (val == null || val.length < 5) return false;
  return true;
}

export function validateEmail(email: string): boolean {
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
    return false;
  }

  const domain = email.substring(atIndex + 1);
  if (domain.indexOf(".") === -1) {
    return false;
  }

  return true;
}

export function validateInputs(email: string, password: string): boolean {
  if (!validateEmail(email)) {
    Alert.alert("Please enter a valid email address");
    return false;
  }
  if (!validatePassword(password)) {
    Alert.alert("Please a password that is 5 characters or longer");
    return false;
  }

  return true;
}

export async function signOut() {
  await supabase.auth.signOut();
}
