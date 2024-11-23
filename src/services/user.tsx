import pb from "../pocketbase"

export const delete_user = (id)  => {
  pb.collection("users").delete(id)
}
