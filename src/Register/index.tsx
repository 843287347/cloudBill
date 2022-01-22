import React from "react";
import "./index.scss";
import { Form, Input, Row, Col, Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { inspirecloud } from "../utils/Inspirecloud";

const Register = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const onFinish = (values: any) => {
    const { username, password } = values;
    inspirecloud
      .run("createUser", { username, password })
      .then((res) => {
        message.success("注册成功");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="registerContainer">
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认密码!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
