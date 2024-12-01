import { useStore } from "@nanostores/react";
import { $user } from "../stores/user";
import { is_admin } from "@/services/user";

export function useIsAdmin() {
  const user = useStore($user);
  return is_admin(user);
}
