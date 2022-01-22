/**
 * This represents some generic auth provider API, like Firebase.
 */
import { message } from "antd";
import { inspirecloud } from "./utils/Inspirecloud";
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(username: string, password: string, callback: VoidFunction) {
    inspirecloud
      .run("loginByUsername", { username, password })
      .then((res) => {
        const { success } = res;
        if (success) {
          message.success("登录成功");
          fakeAuthProvider.isAuthenticated = true;
          callback();
        } else {
          message.warning(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  signout(callback: VoidFunction) {
    inspirecloud
      .run("logout", {})
      .then((res) => {
        const { success } = res;
        if (success) {
          fakeAuthProvider.isAuthenticated = false;
          setTimeout(callback, 100);
        } else {
          message.error("退出失败");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export { fakeAuthProvider };
