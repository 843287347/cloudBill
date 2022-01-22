import { useEffect, useRef } from "react";
import { BillCardProps } from "../type";
import { IconFont, kind2Icon } from "../../utils/IconFont";
import "./index.scss";
import { Menu, Dropdown } from "antd";

const BillCard = (props: BillCardProps) => {
  const { description, money, year, month, day, type, kind, index, _id } =
    props;
  const { handleEdit, handleDetail, handleDelete } = props;
  const billRef = useRef<HTMLDivElement>(null);
  useEffect(() => {});

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          handleEdit({
            type,
            kind,
            description,
            money,
            year,
            month,
            day,
            index,
            _id,
          });
        }}
      >
        修改账单
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          handleDetail({
            type,
            kind,
            description,
            money,
            year,
            month,
            day,
            index,
            _id,
          });
        }}
      >
        查看详细
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          handleDelete({
            type,
            kind,
            description,
            money,
            year,
            month,
            day,
            index,
            _id,
          });
        }}
      >
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["contextMenu"]}>
      <div
        ref={billRef}
        className="billCard"
        style={{
          marginTop: index && index >= 1 ? "-1px" : "0px",
          borderTop: index ? "1px solid rgba(168, 199, 135, 0.349)": "",
        }}
      >
        <div className={"icon"} onClick={() => handleEdit(props)}>
          <IconFont type={kind2Icon(kind) || ""}></IconFont>
        </div>
        <span
          className={"billMoney"}
          style={{ color: type && type === "output" ? "#ff6363" : "green" }}
        >
          {type === "output" ? "-" : "+"}
          {money}
        </span>
        <div className={"textInfo"}>
          <div
            className={"kind"}
            style={{ color: type && type === "output" ? "#ff6363" : "green" }}
          >
            {kind}
          </div>
          <div className={"description"}>{description}</div>
        </div>
      </div>
    </Dropdown>
  );
};

export default BillCard;
