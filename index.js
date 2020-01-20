/* Your Code Here */
class TimeIn {
    constructor(date, hour) {
        this.date = date
        this.hour = parseInt(hour)
        this.type = "TimeIn"
    }
}

class TimeOut {
    constructor(date, hour) {
        this.date = date
        this.hour = parseInt(hour)
        this.type = "TimeOut"
    }
}

function createEmployeeRecord(arr) {
    return {
        "firstName": arr[0],
        "familyName": arr[1],
        "title": arr[2],
        "payPerHour": arr[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords(empsArr) {
    return empsArr.map(createEmployeeRecord)
}

function createTimeInEvent(dateStr) {
    const dateTimeArr = dateStr.split(" ")
    const newTimeInEvent = new TimeIn(dateTimeArr[0],dateTimeArr[1])
    this.timeInEvents.push(newTimeInEvent)
    return this
}

function createTimeOutEvent(dateStr) {
    const dateTimeArr = dateStr.split(" ")
    const newTimeOutEvent = new TimeOut(dateTimeArr[0],dateTimeArr[1])
    this.timeOutEvents.push(newTimeOutEvent)
    return this
}

function hoursWorkedOnDate(date) {
    const tIn = this.timeInEvents.find( tIE => tIE.date === date);
    const tOut = this.timeOutEvents.find( tOE => tOE.date === date);
    return tOut.hour/100 - tIn.hour/100
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this,date);
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(empArr,firstName) {
    return empArr.find(e=>e.firstName === firstName)
}

function calculatePayroll(empObjs) {
    let payroll = 0
    empObjs.forEach(e => payroll = payroll + allWagesFor.call(e))
    return payroll
}