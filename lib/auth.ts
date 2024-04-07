import { Alert } from "react-native";
import { supabase } from "./Supabase";

let role_id: number;

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

export function validateName(name: string) {
  if (!name || name.length == 0) {
    Alert.alert("Please enter a name.");
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

export async function updateClientRoleId() {
  const id = (await supabase.auth.getUser()).data.user?.id;
  if (id == undefined) return;
  const { data } = await supabase
    .from("profiles")
    .select("role_id")
    .eq("id", id);
  if (!data || data?.length == 0) return;

  role_id = data[0].role_id;
}

export function getClientRoleId(): number {
  return role_id;
}
