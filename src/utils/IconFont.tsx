import { createFromIconfontCN } from "@ant-design/icons";
import { inputType, outputType } from "../CloudBill/type";
import { totalInputType, totalOutputType } from "../CloudBill/data";

export const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3136139_pdg3saqxi4.js",
});

export const kind2Icon = (kind: inputType | outputType) => {
  for (let item of totalInputType) {
    if (item.kind === kind) {
      return item.icon;
    }
  }
  for (let item of totalOutputType) {
    if (item.kind === kind) {
      return item.icon;
    }
  }
  return "";
};
