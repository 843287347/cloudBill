import React, { useEffect, useState, useRef, RefObject } from "react";
import { Button, Modal, DatePicker, message } from "antd";
import moment from "moment"; //日期选择的库

import { inspirecloud } from "../utils/Inspirecloud";
import { BillData } from "./type";
import "./index.scss";

import BillCard from "./BillCard/index";
import BillDetail from "./BillDetail";
import BillEdit from "./BillEdit";
import BillAdd from "./BillAdd";

const About = () => {
  const DEFAULT_COUT = 10;
  const tmpDate = new Date();
  const DEFAULT_YEAR = tmpDate.getFullYear().toString();
  const DEFAULT_MONTH =
    tmpDate.getMonth() < 9
      ? "0" + (tmpDate.getMonth() + 1).toString()
      : (tmpDate.getMonth() + 1).toString();

  const ContainerRef: RefObject<HTMLDivElement> = useRef(null);

  const [isCreateVisible, setIsCreateVisible] = useState<boolean>(false);
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [curYear, setCurYear] = useState<string>(DEFAULT_YEAR);
  const [curMonth, setCurMonth] = useState<string>(DEFAULT_MONTH);

  const [outputNum, setOutputNum] = useState<number>(0);
  const [inputNum, setInputNum] = useState<number>(0);
  const [billList, setBillList] = useState<any[]>([]);
  const [curBillData, setCurBillData] = useState<BillData>({
    type: "input",
    kind: "交通",
  });

  useEffect(() => {
    getBills(0, DEFAULT_COUT);

    return () => {
      setBillList([]);
    };
  }, []);

  useEffect(() => {
    getBills(0, DEFAULT_COUT, curYear, curMonth);
  }, [curMonth, curYear]);

  const getBills = (
    current: number,
    count: number,
    year: string = curYear,
    month: string = curMonth
  ) => {
    const params = {
      current,
      count,
      year,
      month,
    };

    inspirecloud
      .run("getBills", params)
      .then((res) => {
        const { result, statistc } = res;
        const newBillList = [...result];
        setBillList(newBillList);

        for (let item of statistc) {
          if (item.type === "output") {
            setOutputNum(item['sum("money")']);
          } else if (item.type === "input") {
            setInputNum(item['sum("money")']);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 添加账单后的回调
  const AddCallback = () => {
    const len = billList.reduce((pre, cur) => pre + cur.records.length, 0);
    getBills(0, len + 1);
  };

  // 点击编辑账单
  const handleEdit = (params: BillData) => {
    setCurBillData(params);
    setIsEditVisible(true);
  };
  // 账单保存后的回调
  const updateCallback = () => {
    setIsEditVisible(false);
    const len = billList.reduce((pre, cur) => pre + cur.records.length, 0);
    getBills(0, len);
  };

  // 点击账单详情
  const handleDetail = (params: BillData) => {
    setCurBillData(params);
    setIsDetailVisible(true);
  };

  // 点击删除账单
  const handleDelete = (params: BillData) => {
    setCurBillData(params);
    inspirecloud
      .run("deleteBill", params)
      .then((res) => {
        message.success("删除成功");
        const len = billList.reduce((pre, cur) => pre + cur.records.length, 0);
        getBills(0, len - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 加载更多
  const loadMore = () => {
    const current = billList.reduce((pre, cur) => pre + cur.records.length, 0);
    const count = DEFAULT_COUT;
    getBills(0, current + count);
  };

  const monthChange = (value: any, dateString: string) => {
    let [year, month] = dateString.split("-");
    setCurYear(year);
    setCurMonth(month);
  };
  const backToday = () => {
    const nowDate = new Date();
    setCurYear(nowDate.getFullYear().toString());
    setCurMonth(
      nowDate.getMonth() < 9
        ? "0" + (nowDate.getMonth() + 1).toString()
        : (nowDate.getMonth() + 1).toString()
    );
  };
  return (
    <div className="billContainer" ref={ContainerRef}>
      <Button
        onClick={() => {
          setIsCreateVisible(true);
        }}
        className={"fixedBottom"}
      >
        {"+"}
      </Button>

      <Modal
        visible={isDetailVisible}
        footer={null}
        onCancel={() => {
          setIsDetailVisible(false);
        }}
      >
        <BillDetail {...curBillData}></BillDetail>
      </Modal>

      <Modal
        visible={isEditVisible}
        footer={null}
        onCancel={() => {
          setIsEditVisible(false);
        }}
        destroyOnClose
      >
        <BillEdit {...curBillData} updateCallback={updateCallback}></BillEdit>
      </Modal>

      <Modal
        footer={null}
        title={null}
        visible={isCreateVisible}
        onCancel={() => {
          setIsCreateVisible(false);
        }}
      >
        <BillAdd AddCallback={AddCallback}></BillAdd>
      </Modal>

      <div className="timeFilter">
        <div className={"monthSelect"}>
          <DatePicker
            picker="month"
            onChange={monthChange}
            value={moment(`${curYear}-${curMonth}`, "YYYY-MM")}
          />
          <Button type="primary" onClick={backToday} className={"backBut"}>
            今 天
          </Button>
        </div>
        <div className={"statistic"}>
          <div className={"output"}>
            支出：
            {outputNum}
          </div>
          <div className={"input"}>
            收入：
            {inputNum}
          </div>
        </div>
      </div>

      <div className="Content">
        {billList.map((item, index) => {
          return (
            <div className="OneDayContent">
              <h3 className="Date">{item.month + "月" + item.day + "日"}</h3>

              {item.records.map((item: any, index: number) => {
                return (
                  <BillCard
                    {...item}
                    index={index}
                    handleEdit={handleEdit}
                    handleDetail={handleDetail}
                    handleDelete={handleDelete}
                  ></BillCard>
                );
              })}
            </div>
          );
        })}
        <button onClick={loadMore}>加载更多</button>
      </div>
    </div>
  );
};

export default About;
