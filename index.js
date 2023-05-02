function createEmployeeRecord(employee) {
  let empleado = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };

  return empleado;
}

function createEmployeeRecords(twoEmployee) {
  // let empleados = twoEmployee.map((e) => {
  //   createEmployeeRecord(e);
  // });

  let employees = twoEmployee.map((e) => createEmployeeRecord(e));
  console.log(employees);
  return employees;
}

function createTimeInEvent(employee, dateStamp) {
  // const hora = date.split(" ");
  let [date, hour] = dateStamp.split(" ");

  let time = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  };

  employee["timeInEvents"].push(time);

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  // const hora = date.split(" ");
  const [date, hour] = dateStamp.split(" ");

  let time = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  };

  employee["timeOutEvents"].push(time);

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  // let timeIn = 0;
  // let dateIn;
  // let timeOut = 0;
  // let dateOut;

  // for (const element of employee.timeInEvents) {
  //   timeIn += element.hour;
  //   dateIn = element.date;
  // }

  // for (const element of employee.timeOutEvents) {
  //   timeOut += element.hour;
  //   dateOut = element.date;
  // }

  const inEvent = employee.timeInEvents.find((e) => e.date === date);
  const outEvent = employee.timeOutEvents.find((e) => e.date === date);

  // const hoursWorked = timeOut - timeIn;
  // //   console.log(hoursWorked);

  // if (dateIn === date && dateOut === date) {
  //   return hoursWorked / 100;
  // }

  const hoursWorked = outEvent.hour - inEvent.hour;
  return hoursWorked / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const payPerHour = parseInt(employee.payPerHour);
  //   console.log(hoursWorked * payPerHour);
  return hoursWorked * payPerHour;
}

function allWagesFor(employee) {
  const timeIn = employee.timeInEvents.map((e) => e.date);
  // const timeOut = employee.timeOutEvents;

  // let cont = 0;
  // timeIn.forEach((e) => {
  //   // console.log(e.date);
  //   cont = wagesEarnedOnDate(employee, e.date);
  // });

  const payable = timeIn.reduce((memo, d) => {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
}

function calculatePayroll(employee) {
  return employee.reduce((memo, rec) => {
    return memo + allWagesFor(rec);
  }, 0);
}
