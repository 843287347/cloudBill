import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
//https://github.com/hustcc/echarts-for-react
//https://echarts.apache.org/zh/index.html

import "./index.scss";
import { inspirecloud } from "../../utils/Inspirecloud";
import { getMonday, weekDate } from "../utils";
const PieVis = (props: any) => {
  const { curType, curYear, curWeek, curMonth } = props;

  const [week, setWeek] = useState(weekDate(getMonday(curYear, curWeek)));
  const [inputData, setInputData] = useState<any[]>([]);
  const [outputData, setOutputData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const optionOutput = {
    title: {
      text:
        curType === "year"
          ? `${curYear}年支出占比`
          : curType === "month"
          ? `${curYear}年${curMonth + 1}月支出占比`
          : `${curYear}年第${curWeek}周支出占比`,
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "支出占比",
        type: "pie",
        radius: "50%",
        data: outputData || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        // left: "0%",
        // right: "50%",
        // top: 0,
        // bottom: 0,
      },
    ],
  };
  const optionInput = {
    title: {
      text:
        curType === "year"
          ? `${curYear}年收入占比`
          : curType === "month"
          ? `${curYear}年${curMonth + 1}月收入占比`
          : `${curYear}年第${curWeek}周 收入占比`,
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "支出占比",
        type: "pie",
        radius: "50%",
        data: inputData || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        // left: "0%",
        // right: "50%",
        top: 0,
        bottom: 0,
      },
    ],
  };
  const optionPie = {
    title: [
      {
        text:
          curType === "year"
            ? `${curYear}年支出/收入占比`
            : curType === "month"
            ? `${curYear}年${curMonth + 1}月支出/收入占比`
            : `${curYear}年第${curWeek}周支出/收入占比`,
        left: "center",
      },
      {
        subtext: "支出占比",
        left: "30%",
        top: "80%",
        textAlign: "center",
      },
      {
        subtext: "收入占比",
        left: "70%",
        top: "80%",
        textAlign: "center",
      },
    ],
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "支出占比",
        type: "pie",
        radius: "50%",
        data: outputData || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        left: "0%",
        right: "50%",
        top: 0,
        bottom: 0,
      },
      {
        name: "支出占比",
        type: "pie",
        radius: "50%",
        data: inputData || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        left: "50%",
        right: "0",
      },
    ],
  };

  useEffect(() => {
    const newWeekData = weekDate(getMonday(curYear, curWeek));
    setWeek(newWeekData);
    getPieData(newWeekData, curType);
  }, [curYear, curMonth, curWeek, curType]);

  const getPieData = (
    tmpweek = week,
    type = curType,
    year = curYear,
    month = curMonth + 1
  ) => {
    setIsLoading(true);

    inspirecloud
      .run("getPieData", { week: tmpweek, type, year, month })
      .then((res) => {
        const { inputTotal, outputTotal } = res;
        const tmpInput = inputTotal.map((item: any) => ({
          name: item.kind,
          value: item.totalMoney,
        }));
        const tmpOutput = outputTotal.map((item: any) => ({
          name: item.kind,
          value: item.totalMoney,
        }));
        setInputData(tmpInput);
        setOutputData(tmpOutput);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function isMobile() {
    let flag =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    return flag;
  }
  return (
    <div>
      {isMobile() && (
        <ReactECharts option={optionOutput} showLoading={isLoading} />
      )}
      {isMobile() && (
        <ReactECharts option={optionInput} showLoading={isLoading} />
      )}
      {!isMobile() && (
        <ReactECharts option={optionPie} showLoading={isLoading} />
      )}
    </div>
  );
};

export default PieVis;
