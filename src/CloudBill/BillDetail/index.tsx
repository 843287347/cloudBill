import React from "react";
import { Modal } from "antd";
import { BillData } from "../type";
const BillDetail = (props: BillData) => {
  const { description, type, kind, year, month, day, money } = props;

  return (
    <div>
      <h3>{`${year}年${month}月${day}日`}</h3>
      <div>备注：{description}</div>
      <div>
        金额：{type === "input" ? "+" : "-"} {money}
      </div>
    </div>
  );
};

export default BillDetail;
