function createEmployeeRecord(employeeData) {
  let employee = {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };

  return employee;
}
  
function createEmployeeRecords(employeesData) {
  return employeesData.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(timeStamp) {
  let [dt, hr ] = timeStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: Number.parseInt(hr, 10),
    date: dt
  });

  return this;
}

function createTimeOutEvent(timeStamp) {
  let [dt, hr] = timeStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: Number.parseInt(hr, 10),
    date: dt
  });

  return this;
}

function hoursWorkedOnDate(givenDate) {
  let inTime = this.timeInEvents.find(it => { return it.date === givenDate });
  let outTime = this.timeOutEvents.find(ot => { return ot.date === givenDate });

  return (outTime.hour - inTime.hour) / 100; // hours in 24h clock, strip off zeros.
}

function wagesEarnedOnDate(givenDate) {
  return hoursWorkedOnDate.call(this, givenDate) * this.payPerHour;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function() {
  let eligibleDates = this.timeInEvents.map(tie => tie.date);
  let payable = eligibleDates.reduce(function(initialAmt, givenDate) {
    return initialAmt + wagesEarnedOnDate.call(this, givenDate)
  }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
}

function findEmployeeByFirstName(employees, employeeFirstName) {
  return employees.find(employee => employee.firstName === employeeFirstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((initialAmt, employee) => {
    return initialAmt + allWagesFor.call(employee);
  }, 0);
}



