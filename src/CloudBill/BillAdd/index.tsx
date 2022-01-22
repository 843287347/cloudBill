import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  message,
} from "antd";
import { fakeData, totalInputType, totalOutputType } from "../data";
import { outputType, inputType, BillData, FormType, kindType } from "../type";
import { IconFont } from "../../utils/IconFont";
import moment from "moment"; //日期选择的库
import "./index.scss";
import { inspirecloud } from "../../utils/Inspirecloud";

const BillAdd = (props: any) => {
  const { AddCallback } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    getToday();
  }, []);

  const [showType, setShowType] = useState<"output" | "input">("output");
  const [outputType, setOutputType] = useState<outputType | inputType>("");
  const [inputType, setInputType] = useState<outputType | inputType>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    let month =
      date.getMonth() < 9
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();

    let day =
      date.getDate() < 9
        ? "0" + date.getDate().toString()
        : date.getDate().toString();

    return `${year}-${month}-${day}`;
  };

  const onShowTypeOutput = () => {
    setShowType("output");
    setInputType("");
  };

  const onShowTypeInput = () => {
    setShowType("input");
    setOutputType("");
  };
  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  function getCurWeek(dateString: string) {
    let date1: any = new Date(); //本年第一天
    let date2: any = new Date(dateString); // dateString对应的日期
    date1.setDate(1);
    date1.setMonth(0);
    let diff = date2 - date1;
    let days = Math.ceil(diff / (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
  }

  const onFinish = (value: FormType) => {
    setSubmitLoading(true);

    const { description, money, date } = value;
    const dateString = date.format("YYYY-MM-DD");
    const [year, month, day] = dateString.split("-");
    const params = {
      description,
      money,
      year,
      month,
      day,
      type: showType,
      kind: showType === "input" ? inputType : outputType,
    };

    inspirecloud
      .run("addBill", params)
      .then((data: any) => {
        setSubmitLoading(false);
        message.success("添加成功");
        AddCallback();

        onReset();
        onCancel();
      })
      .catch((error) => {
        setSubmitLoading(false);
        console.log(error);
        message.error("添加失败");
      });
  };

  return (
    <div className="createBill">
      <div className="typeControl">
        <button
          className={classnames({
            typeControlBut: true,
            activateTypeBut: showType === "output",
          })}
          onClick={onShowTypeOutput}
        >
          支出
        </button>
        <button
          className={classnames({
            typeControlBut: true,
            activateTypeBut: showType === "input",
          })}
          onClick={onShowTypeInput}
        >
          收入
        </button>
      </div>

      {showType === "output" && (
        <div className="outputBill">
          {totalOutputType.map((item: kindType) => {
            return (
              <button
                className={classnames({
                  outputBillItem: true,
                  activateBillItem: outputType === item.kind,
                })}
                onClick={() => {
                  //   setIsCreateVisible(false);
                  setOutputType(item.kind);
                  setIsModalVisible(true);
                }}
              >
                <div style={{ fontSize: "2.5em" }}>
                  <IconFont type={item.icon}></IconFont>
                </div>
                {item.kind}
              </button>
            );
          })}
        </div>
      )}

      {showType === "input" && (
        <div className="outputBill">
          {totalInputType.map((item: kindType) => {
            return (
              <button
                className={classnames({
                  outputBillItem: true,
                  activateBillItem: inputType === item.kind,
                })}
                onClick={() => {
                  //   setIsCreateVisible(false);
                  setInputType(item.kind);
                  setIsModalVisible(true);
                }}
              >
                <div style={{ fontSize: "2.5em" }}>
                  <IconFont type={item.icon}></IconFont>
                </div>
                {item.kind}
              </button>
            );
          })}
        </div>
      )}
      <Modal
        title={`${inputType || outputType}`}
        visible={isModalVisible}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="备注"
            name="description"
            rules={[{ required: true, message: "请输入备注" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="金额"
            name="money"
            initialValue={100}
            rules={[{ required: true, message: "请输入金额" }]}
          >
            <InputNumber prefix="￥" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="日期"
            name="date"
            initialValue={moment(getToday(), "YYYY-MM-DD")}
            rules={[{ required: true, message: "请输入日期" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "25px" }}
              loading={submitLoading}
            >
              提交
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BillAdd;
