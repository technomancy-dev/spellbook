import { atom } from "nanostores";
import pb from "../pocketbase";
import type { AuthModel } from "pocketbase";
import { useEffect, useState } from "react";

export const $user = atom(null);

export const set_current_user = (model: AuthModel) => {
  $user.set(model);
};

export const subscribe_user_to_auth_store = () => {
  return pb.authStore.onChange(async (token, model) => {
    if (model === null) return set_current_user(null);
    const user = await pb.collection("users").getOne(pb.authStore.model.id);
    return set_current_user(user);
  }, true);
};

export const is_authenticated = () => {
  return !!$user.get();
};

export const is_admin = async () => {
  if (!pb.authStore.isValid) {
    return false;
  }
  const user = await pb.collection("users").getOne(pb.authStore.model.id);
  return user.role === "manager";
};

export const github_login = () => {
  return pb
    .collection("users")
    .authWithOAuth2({
      provider: "github",
    })
    .then(({ record }) => set_current_user(record));
};

export const password_sign_in = (username, password) => {
  return pb
    .collection("users")
    .authWithPassword(username, password)
    .then(({ record }) => set_current_user(record));
};

export const logout = () => {
  pb.authStore.clear();
};

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    is_admin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, []);
  return isAdmin;
}
