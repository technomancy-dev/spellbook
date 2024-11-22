import { atom } from 'nanostores'
import type { AuthModel } from 'pocketbase'

export const $user = atom(null)

export const set_current_user = (model: AuthModel) => {
  $user.set(model)
}
