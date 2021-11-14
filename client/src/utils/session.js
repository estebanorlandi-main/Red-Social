import { getLocal } from "./storage";

export function isLogin() {
  return !!getLocal("codenete_user").username;
}
