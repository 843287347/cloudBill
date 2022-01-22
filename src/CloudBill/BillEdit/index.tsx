import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Select,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import moment from "moment"; //日期选择的库
import { totalInputType, totalOutputType } from "../data";
import { kindType, inputType, outputType } from "../type";
import { IconFont } from "../../utils/IconFont";
import { inspirecloud } from "../../utils/Inspirecloud";

interface FormType {
  description: string;
  money: number;
  date: any;
  type: "input" | "output";
  kind: inputType | outputType;
}

const BillEdit = (props: any) => {
  const { type, kind, description, money, year, month, day, _id } = props;
  const { updateCallback } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalKinds, setTotalKinds] = useState<kindType[]>([]);

  useEffect(() => {
    type === "input" && setTotalKinds(totalInputType);
    type === "output" && setTotalKinds(totalOutputType);
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (value: FormType) => {
    setIsLoading(true);
    const { description, money, date, kind, type } = value;
    const dateString = date.format("YYYY-MM-DD");
    const [year, month, day] = dateString.split("-");

    const params = {
      _id,
      kind,
      type,
      description,
      money,
      year,
      month,
      day,
    };
    inspirecloud
      .run("updateBill", params)
      .then((res) => {
        setIsLoading(false);
        message.success("保存成功");
        updateCallback();
      })
      .catch((error) => {
        setIsLoading(false);
        message.error("保存失败");
        console.log(error);
      });
  };

  const onChange = (e: RadioChangeEvent) => {
    const curType = e.target.value;
    curType === "input" && setTotalKinds(totalInputType);
    curType === "output" && setTotalKinds(totalOutputType);
  };

  const getOptions = () => {
    return totalKinds.map((item) => (
      <Select.Option key={item.kind}>
        <span>
          <IconFont type={item.icon}></IconFont>
        </span>
        {item.kind}
      </Select.Option>
    ));
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="类型"
          name="type"
          initialValue={type}
          rules={[{ required: true, message: "请输入类型" }]}
        >
          <Radio.Group buttonStyle="solid" onChange={onChange}>
            <Radio.Button value="output">支出</Radio.Button>
            <Radio.Button value="input">收入</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="种类"
          name="kind"
          initialValue={kind}
          rules={[{ required: true, message: "请输入种类" }]}
        >
          <Select>{getOptions()}</Select>
        </Form.Item>
        <Form.Item
          label="备注"
          name="description"
          initialValue={description}
          rules={[{ required: true, message: "请输入备注" }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="金额"
          name="money"
          initialValue={money}
          rules={[{ required: true, message: "请输入金额" }]}
        >
          <InputNumber prefix="￥" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="日期"
          name="date"
          initialValue={moment(`${year}-${month}-${day}`, "YYYY-MM-DD")}
          rules={[{ required: true, message: "请输入日期" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item style={{ margin: "10px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "25px" }}
            loading={isLoading}
          >
            保存
          </Button>
          <Button onClick={onReset}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BillEdit;
