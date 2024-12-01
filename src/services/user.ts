import { isNil } from "ramda";
import pb from "../pocketbase";
import { queryClient } from "../stores/query";
import { $user, set_current_user } from "../stores/user";

export const delete_user = (id) => {
  pb.collection("users")
    .delete(id)
    .then(() => {
      queryClient.refetchQueries({ queryKey: ["users"] });
    });
};

export const create_user = (data) => {
  return pb.collection("users").create({ ...data, role: "user" });
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

export const sign_out = (callback?: Function) => {
  pb.authStore.clear();
  callback();
};

export const is_authenticated = () => {
  if (!pb.authStore.isValid) return false;

  // Don't await this, let it run in the background.
  // This lets pages feel instant, and will simply log them out if it fails later.

  pb.collection("users")
    .authRefresh({ requestKey: null })
    .catch(() => sign_out(() => window.location.assign("/")));

  return pb.authStore.isValid;
};

export const is_admin = (user) => {
  if (!is_authenticated()) {
    return false;
  }
  if (isNil(user)) user = $user.get();

  return user.role === "manager";
};
