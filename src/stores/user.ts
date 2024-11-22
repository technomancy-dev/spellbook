import { atom } from 'nanostores'
import pb from "../pocketbase"
import type { AuthModel } from 'pocketbase'

export const $user = atom(null)

export const set_current_user = (model: AuthModel) => {
  $user.set(model)
}

export const github_login = async () => {
  await pb.collection("users").authWithOAuth2({
    provider: "github",
  });
};

export const is_authenticated = () => {
  console.log($user.get())
  return !!$user.get()
}
