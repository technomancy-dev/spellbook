import { isNil } from "ramda";
import { pb } from "@/pb-instance";
import { query_client } from "@/stores/query";
import { $user, set_current_user } from "@/stores/user";
import { ONE_SECOND } from "@/helpers/time";
import { queryOptions } from "@tanstack/react-query";

export const users_query_options = queryOptions({
  queryKey: ["users"],
  queryFn: () => pb.collection("users").getFullList(),
});

export const delete_user = (id) => {
  pb.collection("users")
    .delete(id)
    .then(() => {
      query_client.refetchQueries({ queryKey: ["users"] });
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
  // This retries a few times because refreshing at the right time and other things can cancel it.
  // staleTime ONE_SECOND prevents this from running multiple times to pages
  // that have multiple authentication checks.
  query_client.fetchQuery({
    queryKey: ["user_refresh"],
    queryFn: () => {
      return pb.collection("users").authRefresh({ requestKey: null });
    },
    staleTime: ONE_SECOND,
    retry: sign_out_after_retry_limit(3),
  });

  return pb.authStore.isValid;
};

export const is_admin = (user?) => {
  if (!is_authenticated()) {
    return false;
  }
  if (isNil(user)) user = $user.get();

  return user?.role === "manager";
};

const sign_out_after_retry_limit = (retry_limit) => (failure_count, error) => {
  if (failure_count >= retry_limit) {
    sign_out(() => window.location.assign("/"));
    return false;
  }
  return true;
};
