import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react"; //https://github.com/hustcc/echarts-for-react
//https://echarts.apache.org/zh/index.html

import "./index.scss";
import { inspirecloud } from "../utils/Inspirecloud";
import LineVis from "./LineVis";
import PieVis from "./PieVis";
import { getMonday, getTotalWeek, weekDate, getCurWeek } from "./utils";
import { Button, Select } from "antd";

const Analysis = (props: any) => {
  const [curYear, setCurYear] = useState(new Date().getFullYear());
  const [curMonth, setCurMonth] = useState(new Date().getMonth());
  const [curWeek, setCurWeek] = useState(getCurWeek());
  const [curType, setCurType] = useState<"month" | "year" | "week">("week");

  const handlePre = () => {
    if (curType === "year") {
      setCurYear(curYear - 1);
      return;
    }

    if (curType === "month") {
      if (curMonth === 0) {
        setCurMonth(11);
        setCurYear(curYear - 1);
      } else {
        setCurMonth(curMonth - 1);
      }
      return;
    }

    if (curType === "week") {
      if (curWeek === 1) {
        setCurWeek(getTotalWeek(curYear - 1));
        setCurYear(curYear - 1);
      } else {
        setCurWeek(curWeek - 1);
      }
    }
  };

  const handleNext = () => {
    if (curType === "year") {
      setCurYear(curYear + 1);
      return;
    }

    if (curType === "month") {
      if (curMonth === 11) {
        setCurYear(curYear + 1);
        setCurMonth(0);
      } else {
        setCurMonth(curMonth + 1);
      }
      return;
    }

    if (curType === "week") {
      if (curWeek === getTotalWeek(curYear)) {
        setCurWeek(1);
        setCurYear(curYear + 1);
      } else {
        setCurWeek(curWeek + 1);
      }
    }
  };

  const typeChange = (e: any) => {
    initDate();
    setCurType(e);
  };

  const initDate = () => {
    setCurYear(new Date().getFullYear());
    setCurMonth(new Date().getMonth());
    setCurWeek(getCurWeek());
  };

  return (
    <div className={"analysis"}>
      <div className={"anaControl"}>
        <div style={{ float: "right", marginRight: "10px" }}>
          <Select onChange={typeChange} defaultValue="week">
            <Select.Option value="year">年</Select.Option>
            <Select.Option value="month">月</Select.Option>
            <Select.Option value="week">周</Select.Option>
          </Select>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handlePre} style={{ margin: "0 20px" }}>
            上个
            {curType === "month" ? "月" : curType === "year" ? "年" : "周"}
          </Button>
          <Button onClick={handleNext}>
            下个
            {curType === "month" ? "月" : curType === "year" ? "年" : "周"}
          </Button>
        </div>
      </div>
      {/* <div> {curYear} 年</div>
      <div> {curMonth + 1} 月</div>
      <div> {curWeek} week</div> */}
      <div className="line">
        <LineVis
          curType={curType}
          curYear={curYear}
          curMonth={curMonth}
          curWeek={curWeek}
        ></LineVis>
      </div>
      <div className={"pie"}>
        <PieVis
          curType={curType}
          curYear={curYear}
          curMonth={curMonth}
          curWeek={curWeek}
        ></PieVis>
      </div>
      <div>{}</div>;
    </div>
  );
};

export default Analysis;
