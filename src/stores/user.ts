import { atom } from "nanostores";
import pb from "../pocketbase";
import type { AuthModel } from "pocketbase";

export const $user = atom(null);

export const set_current_user = (model: AuthModel) => {
  $user.set(model);
};

export const subscribe_user_to_auth_store = () => {
  return pb.authStore.onChange(async (token, model) => {
    const user = await pb.collection("users").getOne(pb.authStore.model.id);
    set_current_user(user);
  }, true);
};

export const is_authenticated = () => {
  return !!$user.get();
};

export const is_admin = async () => {
  const user = await pb.collection("users").getOne(pb.authStore.model.id);
  console.log({ user });
  return user.role === "manager";
};

export const github_login = async () => {
  await pb.collection("users").authWithOAuth2({
    provider: "github",
  });
};

export const logout = () => {
  pb.authStore.clear();
};
