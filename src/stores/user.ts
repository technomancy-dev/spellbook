import { equals } from "ramda";
import { atom } from "nanostores";
import { pb } from "@/pb-instance";
import { sign_out } from "@/services/user";
import { query_client } from "@/stores/query";

export const $user = atom(null);

export const set_current_user = (user) => {
  $user.set(user);
};

export const get_current_user = () => {
  $user.get();
};

export const subscribe_user_to_auth_store = () => {
  return pb.authStore.onChange(async (_, model) => {
    if (model === null) return set_current_user(null);

    console.debug("SUBSCRIPTION-CHANGE")
    const user = await query_client.fetchQuery({
      queryKey: ["user_auth"],
      queryFn: () => {
        return pb
          .collection("users")
          .getOne(pb.authStore.model.id, { requestKey: null })
          .catch((e) => {
            console.error(e);
            sign_out(() => window.location.assign("/"));
          });
      },
    });

    if (!user) return sign_out(() => window.location.assign("/"));

    // Since we re-auth users all the time (like on navigation)
    // we don't want to update the store if they are the same.
    // Without this hooks like isAdmin would cause an infinite loop.

    if (!equals(user, $user.get())) return set_current_user(user);
  });
};
