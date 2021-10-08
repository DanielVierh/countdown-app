let countDownDate = new Date("Oct 01, 2021 15:06:00").getTime();
let timeIsRunning = true;

window.onload = load_Deadline();

function display_Current_Time() {
    let date = new Date();
    let now = new Date().getTime();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Abstand 
    var distance = countDownDate - now;

    // In lesbare Zeit umwandeln
    var countdDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    var countHours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var countMinutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    var countSeconds = Math.floor(distance % (1000 * 60) / 1000);


    let currentTime = addZeroUnderTen(hour)  + ":" + addZeroUnderTen(minutes)  + ":" + addZeroUnderTen(seconds) ;

    if(countdDays < 0) {
        timeIsRunning = false;
    }else{
        timeIsRunning = true;
    }

    if(timeIsRunning == true) {
        document.getElementById("dCont").innerHTML = addZeroUnderTen(countdDays);
        document.getElementById("stCont").innerHTML = addZeroUnderTen(countHours);
        document.getElementById("mCont").innerHTML = addZeroUnderTen(countMinutes);
        document.getElementById("seCont").innerHTML = addZeroUnderTen(countSeconds);
        
    }else{
        document.getElementById("dCont").innerHTML = "00";
        document.getElementById("stCont").innerHTML = "00";
        document.getElementById("mCont").innerHTML = "00";
        document.getElementById("seCont").innerHTML = "00";
    }
    document.getElementById("current_Time").innerHTML = currentTime;
}


function addZeroUnderTen(timeVal) {
    if(timeVal < 10)  {
        timeVal = "0" + timeVal;
    }
    if(timeVal <= 0) {
        timeVal = "00";
    }
    return timeVal;
}

function saveDeadline() {
    const rawTime = document.getElementById("theDeadline").value;
    let mon = splitVal(rawTime, '-', 1);
    mon = numMonth_in_Month(mon);
    const yr = splitVal(rawTime, '-', 0);
    const dayTimePrt = splitVal(rawTime, '-', 2);
    const dy = splitVal(dayTimePrt, 'T', 0);
    const hourPrt = splitVal(dayTimePrt, 'T', 1);
    const hr = splitVal(hourPrt, ':', 0);
    const mt = splitVal(hourPrt, ':', 1);
    const strDeadline = "" + mon + " " + dy + ", " + yr + " " + hr + ":" + mt + ":00";
    countDownDate = new Date(strDeadline).getTime();
    const eventName = document.getElementById("txtEvent").value + ": " + dy + "." + mon + "." + yr + " - " + hr + ":" + mt;
    save_Deadline(strDeadline, eventName);
    document.getElementById("deadline").innerHTML = eventName ;
    $.mobile.navigate( "#p1" );
}

function splitVal(val, marker, pos) {
    const elem = val.split(marker);
    const retVal = elem[pos];
    return retVal;
}

function numMonth_in_Month(month) {
    let monthName = "";
    switch (month) {
        case "01":
            monthName = "Jan";
            break;
        case "02":
            monthName = "Feb";
            break;
        case "03":
            monthName = "Mar";
            break;
        case "04":
            monthName = "Apr";
            break;
        case "05":
            monthName = "May";
            break;
        case "06":
            monthName = "Jun";
            break;
        case "07":
            monthName = "Jul";
            break;
        case "08":
            monthName = "Aug";
            break;
        case "09":
            monthName = "Sep";
            break;
        case "10":
            monthName = "Oct";
            break;
        case "11":
            monthName = "Nov";
            break;
        case "12":
            monthName = "Dec";
            break;
        default:
            break;
    }

    return monthName;

}


setInterval(() => {
    display_Current_Time();
}, 1000);


// Save
function save_Deadline(deadl, name) {
    localStorage.setItem('storedDeadline', deadl);
    localStorage.setItem('storedEventName', name);
}

// Load
function load_Deadline() {
    if(localStorage.getItem("storedDeadline") != "") {
        try {
            const countdwn = localStorage.getItem("storedDeadline");
            let eventName = localStorage.getItem("storedEventName").toString();
            countDownDate = new Date(countdwn).getTime();
            document.getElementById("deadline").innerHTML = eventName;
        } catch (error) {
            console.log(error);
        }
    }else{
        countDownDate = new Date("Oct 01, 2020 15:06:00").getTime();
    }
}