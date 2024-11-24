import pb from "../pocketbase";
import { queryClient } from "../stores/query";

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
