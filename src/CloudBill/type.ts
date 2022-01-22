import BillCard from "./BillCard";

export type outputType =
  | "食物" // 食物
  | "购物" // 购物
  | "日常" // 日常
  | "交通" // 交通
  | "蔬菜" // 蔬菜
  | "水果" // 水果
  | "运动" // 运动
  | "娱乐" // 娱乐
  | "服装" //服装
  | "宠物" //宠物
  | "微信" //微信
  | "";

export type inputType =
  | "工资" // 工资
  | "兼职" // 兼职
  | "理财" // 理财
  | "生活费" // 生活费
  | "";

export interface kindType {
  kind: outputType | inputType;
  icon: string;
}

export interface FormType {
  description: string;
  money: number;
  date: any;
}
export interface BillData {
  description?: string; // 备注
  money?: number; // 金额
  year?: string; // 年
  month?: string; // 月
  day?: string; // 日
  type: "input" | "output"; // 支出或收入
  kind: inputType | outputType | ""; //收入/支出种类
  index?: number; // 下标
  _id?: string; // BillId
}

export interface BillCardProps extends BillData {
  handleEdit: (params: BillData) => void;
  handleDetail: (params: BillData) => void;
  handleDelete: (params: BillData) => void;
}
