import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { CustomLink } from "../App";
import { inspirecloud } from "../utils/Inspirecloud";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../index";
import "./index.scss";
const { useForm } = Form;

const Login = () => {
  const [form] = useForm();
  let navigate = useNavigate();
  let location = useLocation();
  let from = "/cloudBill";
  let auth = useAuth();

  useEffect(() => {}, []);

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: any) => {
    const { username, password } = values;
    auth.signin(username, password, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
    return;
  };
  const gotoRegister = () => {};
  return (
    <div className={"LoginContainer"}>
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <div className={"LoginForm"}>
        <Form
          form={form}
          layout={"horizontal"}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label={"用户名"} name={"username"}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item label={"密码"} name={"password"}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
            <CustomLink to={"/register"}>{"注册账号"}</CustomLink>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              style={{ marginRight: "20px" }}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
