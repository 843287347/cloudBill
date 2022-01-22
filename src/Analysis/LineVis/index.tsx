import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
//https://github.com/hustcc/echarts-for-react
//https://echarts.apache.org/zh/index.html

import { inspirecloud } from "../../utils/Inspirecloud";
import { getMonday, weekDate, getDayOfMonth } from "../utils";
import "./index.scss";

const LineVis = (props: any) => {
  const { curType, curYear, curWeek, curMonth } = props;

  const [week, setWeek] = useState(weekDate(getMonday(curYear, curWeek)));
  const [inputData, setInputData] = useState<any[]>([]);
  const [outputData, setOutputData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const weekTostring = (tmpWeek = week) => {
    const result = [];
    for (let item of tmpWeek) {
      const { year, month, day } = item;
      result.push(`${month}月${day}日`);
    }
    return result;
  };

  const daysOfMonth = () => {
    const len = getDayOfMonth(curYear, curMonth);
    const arr = Array(len).fill(0);
    return arr.map((item, index) => `${index + 1}日`);
  };

  const optionLine = {
    title: {
      text:
        curType === "week"
          ? `${curYear}年第${curWeek}周`
          : curType === "month"
          ? `${curYear}年${curMonth + 1}月`
          : `${curYear}年`,
      //   left: "center",
    },
    xAxis: {
      type: "category",
      data:
        curType === "week"
          ? weekTostring(week)
          : curType === "month"
          ? daysOfMonth()
          : [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
    },
    yAxis: {
      type: "value",
      name: "金额",
      axisLabel: {
        formatter: "¥{value}",
      },
    },
    legend: {},
    series: [
      {
        name: "收入",
        data: inputData || [],
        type: "line",
        areaStyle: {
          color: "#ff6363",
          opacity: 0.5,
        },
        itemStyle: {
          color: "#ff6363",
        },
        lineStyle: {
          normal: {
            color: "#ff6363",
            width: 1,
          },
        },
      },
      {
        name: "支出",
        data: outputData || [],
        type: "line",
        areaStyle: {
          color: "green",
          opacity: 0.5,
        },
        itemStyle: {
          color: "green",
        },
        lineStyle: {
          normal: {
            color: "green",
            width: 1,
          },
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
  };

  useEffect(() => {
    const newWeekData = weekDate(getMonday(curYear, curWeek));
    setWeek(newWeekData);
    getStatistic(newWeekData, curType);
  }, [curYear, curMonth, curWeek, curType]);

  const getStatistic = (
    tmpweek = week,
    type = curType,
    year = curYear,
    month = curMonth + 1
  ) => {
    setIsLoading(true);
    inspirecloud
      .run("getLineData", { week: tmpweek, type, year, month })
      .then((res) => {
        if (type === "week") {
          const { result } = res;

          const tmpInput = new Array(7).fill(0);
          const tmpOutput = new Array(7).fill(0);

          for (let i = 0; i < result.length; i++) {
            const { statistc } = result[i];
            if (statistc.length > 0) {
              for (let item of statistc) {
                if (item.type === "input") tmpInput[i] = item['sum("money")'];
                else tmpOutput[i] = item['sum("money")'];
              }
            }
          }
          setInputData(tmpInput);
          setOutputData(tmpOutput);
          setIsLoading(false);
        }

        if (type === "month") {
          const { inputData, outputData } = res;
          let len = getDayOfMonth(year, month - 1);
          const tmpInput = Array(len).fill(0);
          const tmpOutput = Array(len).fill(0);
          for (let item of inputData) {
            const { day, totalMoney } = item;
            tmpInput[day - 1] += totalMoney;
          }
          for (let item of outputData) {
            const { day, totalMoney } = item;
            tmpOutput[day - 1] += totalMoney;
          }
          setInputData(tmpInput);
          setOutputData(tmpOutput);
          setIsLoading(false);
        }

        if (type === "year") {
          const { inputData, outputData } = res;
          const tmpInput = Array(12).fill(0);
          const tmpOutput = Array(12).fill(0);

          for (let item of inputData) {
            const { month, totalMoney } = item;
            tmpInput[month - 1] += totalMoney;
          }
          for (let item of outputData) {
            const { month, totalMoney } = item;
            tmpOutput[month - 1] += totalMoney;
          }
          setInputData(tmpInput);
          setOutputData(tmpOutput);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ReactECharts option={optionLine} showLoading={isLoading} />
    </>
  );
};

export default LineVis;
