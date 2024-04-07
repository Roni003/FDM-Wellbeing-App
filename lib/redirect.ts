import { router } from "expo-router";
import { supabase } from "./Supabase";
import { getClientRoleId } from "./auth";

export function redirectUser(destination: string) {
  const role_id = getClientRoleId();
  console.log(role_id);
  if (role_id == 0) {
    router.navigate("/user/(tabs)/" + destination);
  } else if (role_id == 1) {
    router.navigate("/ambassador/(tabs)/" + destination);
  }
}

export async function redirectAfterLogin(uid: string) {
  if (uid == null) {
    console.log("No uid, redirecting to login page");
    router.navigate("/");
    return;
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", uid);

  if (!profiles || profiles.length == 0 || profiles[0].role_id == 0) {
    //console.log("User is a consultant");
    router.navigate("/user/(tabs)/");
    return;
  }

  //console.log("User is an ambassador");
  router.navigate("/ambassador/(tabs)/");
}
