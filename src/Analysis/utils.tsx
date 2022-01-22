export function getMonday(fullYear: number, week: number) {
  // 从周一开始，属于本年
  // 本年的第一天
  let firstDate: Date = new Date();
  firstDate.setFullYear(fullYear);
  firstDate.setMonth(0);
  firstDate.setDate(1);

  let day = firstDate.getDay() || 7; //周几
  // 本年的第一个周一
  const weekMon: Date = new Date(fullYear.toString());
  if (day !== 1) {
    weekMon.setDate(2 - day + week * 7);
    return weekMon;
  } else {
    weekMon.setDate(1 + (week - 1) * 7);
    return weekMon;
  }
}

export function getTotalWeek(year: number) {
  const start: any = getMonday(year, 1);
  const end: any = getMonday(year + 1, 1);
  const diff = Math.ceil((end - start) / (24 * 60 * 60 * 1000));
  return Math.ceil(diff / 7);
}

export function weekDate(Date: Date) {
  const week = [0, 1, 1, 1, 1, 1, 1];
  let result = [];
  for (let item of week) {
    const dateTime = Date;
    dateTime.setDate(Date.getDate() + item);
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth();
    let day = dateTime.getDate();
    result.push({
      year,
      month: month + 1,
      day,
    });
  }
  return result;
}

export function getCurWeek() {
  let date1: any = new Date(); //本年第一天
  let date2: any = new Date(); //
  date1.setDate(1);
  date1.setMonth(0);
  let diff = date2 - date1;
  let days = Math.ceil(diff / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
}

export function getDayOfMonth(year: number, month: number) {
  let date1: any = new Date();
  let date2: any = new Date();
  date1.setFullYear(year);
  date1.setMonth(month);
  date1.setDate(0);

  date2.setFullYear(year);
  date2.setMonth(month + 1);
  date2.setDate(0);

  return Math.ceil((date2 - date1) / (24 * 60 * 60 * 1000));
}
