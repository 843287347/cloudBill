import React from "react";
import { Form, Input, Button } from "antd";
import "./index.scss";
const { useForm } = Form;
const Setting = () => {
  const [form1] = useForm();

  const onReset = () => {
    form1.resetFields();
  };

  return (
    <div className={"SettingContainer"}>
      <h2>修改密码</h2>
      <div>
        <Form form={form1} layout={"vertical"}>
          <Form.Item label={"新密码"}>
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label={"确认密码"}>
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </div>

      <h2>绑定手机号</h2>
    </div>
  );
};

export default Setting;
