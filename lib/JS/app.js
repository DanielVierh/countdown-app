let countDownDate = new Date("Oct 01, 2021 15:06:00").getTime();
let timeIsRunning = true;
let countdowns = [];
let countdownAmount = 0;
let currentCountdown = 0;
const countdownContainer = document.getElementById("countdownContainer");
window.onload = load_Deadline();
let isNewEvent = true;

class Countdown {
    constructor(event, deadline, id) {
        this.event = event;
        this.deadline = deadline;
        this.id = id;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ergänzt eine Null, wenn die Zahl unter 10 liegt
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addZeroUnderTen(timeVal) {
    if(timeVal < 10)  {
        timeVal = "0" + timeVal;
    }
    if(timeVal <= 0) {
        timeVal = "00";
    }
    return timeVal;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Neuen Countdown speichern
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function saveDeadline() {
    const rawTime = document.getElementById("theDeadline").value;
    if(rawTime != "") {
        if(isNewEvent === true) {
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
            const eventName = document.getElementById("txtEvent").value + "; " + dy + "." + mon + "." + yr + " - " + hr + ":" + mt;
            const id = dy + mon + yr +  hr +  mt
            countdowns.push(new Countdown(eventName, strDeadline, id));
            save_Deadline();
            $("#txtEvent").val("");
            $.mobile.navigate( "#p3" );
            location.reload();
        }else {
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
            const eventName = document.getElementById("txtEvent").value + "; " + dy + "." + mon + "." + yr + " - " + hr + ":" + mt;
            countdowns[currentCountdown].event = eventName;
            $("#txtEvent").val("");
            $.mobile.navigate( "#p3");
            save_Deadline();
            location.reload();
        }
    }else{
        alert("Bitte die Deadline eingeben");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function splitVal(val, marker, pos) {
    const elem = val.split(marker);
    const retVal = elem[pos];
    return retVal;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function numMonth_in_Month(month) {
    let monthName = "";
    switch (month) {
        case "01": monthName = "Jan"; break;
        case "02": monthName = "Feb"; break;
        case "03": monthName = "Mar"; break;
        case "04": monthName = "Apr"; break;
        case "05": monthName = "May"; break;
        case "06": monthName = "Jun"; break;
        case "07": monthName = "Jul"; break;
        case "08": monthName = "Aug"; break;
        case "09": monthName = "Sep"; break;
        case "10": monthName = "Oct"; break;
        case "11": monthName = "Nov"; break;
        case "12": monthName = "Dec"; break;
        default: break;
    }
    return monthName;
}


setInterval(() => {
    display_Current_Time();
    displayAllCountdownTimer();
}, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Save
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function save_Deadline() {
    localStorage.setItem('storedDeadline', JSON.stringify(countdowns));
}

function save_last_Pos() {
    localStorage.setItem('lastPos', JSON.stringify(currentCountdown));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function load_Deadline() {
    if(localStorage.getItem("storedDeadline") != "") {
        // debugger
        try {
            countdowns = JSON.parse(localStorage.getItem("storedDeadline"));
            if(countdowns === null){
                countdowns = [];
                document.getElementById("bez").innerHTML = "Kein Countdown vorh.";
            }else{
                    currentCountdown = JSON.parse(localStorage.getItem("lastPos"));
                    if(currentCountdown === isNaN || currentCountdown == null) {
                        // console.log('Load-Error Stored Last pos: ' + currentCountdown);
                        currentCountdown = 0;
                    }
                // console.log(currentCountdown);
                const arrVal = countdowns[currentCountdown].event;
                document.getElementById("bez").innerHTML = splitVal(arrVal,';', 0);
                document.getElementById("deadline").innerHTML = splitVal(arrVal,';', 1);
                countDownDate = new Date(countdowns[currentCountdown].deadline).getTime();
            }
            countdownAmount = countdowns.length;
            showHideNavibuttons();
            renderAllCountdowns();
        } catch (error) {
            showHideNavibuttons();
            countDownDate = new Date("Oct 01, 2020 15:06:00").getTime();
            document.getElementById("bez").innerHTML = "Kein Countdown vorh.";
            // console.log('Load-Error Stored Deadline: ' + error);
        }
    }else{
        // countDownDate = new Date("Oct 01, 2020 15:06:00").getTime();
        // document.getElementById("bez").innerHTML = "Kein Countdown vorh.";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Navibuttons ein / ausblenden
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showHideNavibuttons() {
    if(currentCountdown > 0 && currentCountdown < countdownAmount) {
        try {
            const txtBtnLeft = splitVal(countdowns[currentCountdown - 1].event,';', 0);
            const txtBtnRight = splitVal(countdowns[currentCountdown + 1].event,';', 0);
            $("#btnRight").show();
            $("#btnLeft").show();
            document.getElementById("btnLeft").innerText =  '< ' + txtBtnLeft;
            document.getElementById("btnRight").innerText = txtBtnRight + ' >';
        } catch {
            $("#btnRight").show();
            $("#btnLeft").show();
            document.getElementById("btnLeft").innerText = "<";
            document.getElementById("btnRight").innerText = ">";
        }
    }

    if(countdownAmount === 0) {
        $("#btnLeft").hide();
        $("#btnRight").hide();
        $("#delButton").hide();
    }else{
        $("#delButton").show();
    }

    if(currentCountdown >= countdownAmount - 1) {
        $("#btnRight").hide();
    }else{
        try {
            const txtBtnRight = splitVal(countdowns[currentCountdown + 1].event,';', 0);
            $("#btnRight").show();
            document.getElementById("btnRight").innerText = txtBtnRight + ' >';
        } catch {
            $("#btnRight").show();
        }
    }

    if(currentCountdown <= 0) {
        $("#btnLeft").hide();
    }else{
        try {
            const txtBtnLeft = splitVal(countdowns[currentCountdown - 1].event,';', 0);
            $("#btnLeft").show();
            document.getElementById("btnLeft").innerText = '< ' + txtBtnLeft;
        } catch {
            $("#btnLeft").show();
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Eigentliche Navigation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gotoPrev() {
    if(currentCountdown > 0) {
        currentCountdown--;
        const arrVal = countdowns[currentCountdown].event;
        document.getElementById("bez").innerHTML = splitVal(arrVal,';', 0);
        document.getElementById("deadline").innerHTML = splitVal(arrVal,';', 1);
        countDownDate = new Date(countdowns[currentCountdown].deadline).getTime();
        showHideNavibuttons();
        save_last_Pos();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function gotoNext() {
    if(currentCountdown < countdownAmount) {
        currentCountdown++;
        const arrVal = countdowns[currentCountdown].event;
        document.getElementById("bez").innerHTML = splitVal(arrVal,';', 0);
        document.getElementById("deadline").innerHTML = splitVal(arrVal,';', 1);
        countDownDate = new Date(countdowns[currentCountdown].deadline).getTime();
        showHideNavibuttons();
        save_last_Pos();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Countdown löschen
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteCountdown1() {
    const countdownName = splitVal(countdowns[currentCountdown].event,';', 0);
    const confirmDeletion = window.confirm(`Möchtest du den Countdown "${countdownName}" wirklich löschen?`);
    if(confirmDeletion) {
        // Position löschen
        countdowns.splice(currentCountdown,1);
        // Array speichern
        save_Deadline();
        // Reload
        location.reload();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Checken, ob Textlänge 25 unterschreitet
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let txtfieldTxt = "";
function checkChrLength() {
    let currentChr = 25 - document.getElementById("txtEvent").value.length;
    $("#ausgZeichen").text((25-currentChr) + "/25");
    if(currentChr < 0){
        $("#txtEvent").val(txtfieldTxt);
        currentChr = 25 - document.getElementById("txtEvent").value.length;
        $("#ausgZeichen").text((25-currentChr) + "/25");
    }else{
        txtfieldTxt = document.getElementById("txtEvent").value;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Timer Übersicht
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderAllCountdowns() {

    for(let i = 0; i<countdowns.length; i++) {

        const rawTitle = countdowns[i].event;

        let title = document.createElement("h3");
        title.innerHTML = splitVal(rawTitle + '', ';', 0);

        let timerDate = document.createElement("h4");
        timerDate.innerHTML = splitVal(rawTitle + '', ';', 1);

        let timerlabel = document.createElement("p");
        timerlabel.setAttribute("id", `${countdowns[i].id}`);
        timerlabel.innerHTML = '00 T | 00 Std | 00 Min | 00 Sek';

        let deleteButton = document.createElement('div');
        deleteButton.innerHTML = "X"
        deleteButton.classList.add("deletebutton");
        deleteButton.setAttribute("id", `del_${countdowns[i].id}`);
        deleteButton.setAttribute("onclick", "deleteCountdown(id)");

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.setAttribute("id", `cont_${countdowns[i].id}`);
        wrapper.setAttribute("onclick", "gotoCountdown(id)");
        wrapper.appendChild(title);
        wrapper.appendChild(timerDate);
        wrapper.appendChild(timerlabel);
        wrapper.appendChild(deleteButton);

        countdownContainer.appendChild(wrapper)
    }
}


function displayAllCountdownTimer() {

    for(let i = 0; i<countdowns.length; i++) {

        const dline = new Date(countdowns[i].deadline).getTime();
        const id = countdowns[i].id;
        timeDiff(id, dline)
    }
}



function timeDiff(id, dline) {
    let date = new Date();
    let now = new Date().getTime();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Abstand
    let distance = dline - now;

    // In lesbare Zeit umwandeln
    let countdDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    let countHours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let countMinutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    let countSeconds = Math.floor(distance % (1000 * 60) / 1000);


    let currentTime = addZeroUnderTen(hour)  + ":" + addZeroUnderTen(minutes)  + ":" + addZeroUnderTen(seconds) ;

    if(countdDays < 0) {
        timeIsRunning = false;
    }else{
        timeIsRunning = true;
    }

    if(timeIsRunning == true) {
        const timeLabel = `${addZeroUnderTen(countdDays)} T | ${addZeroUnderTen(countHours)} Std | ${addZeroUnderTen(countMinutes)} Min | ${addZeroUnderTen(countSeconds)} Sek`;
        document.getElementById(id).innerHTML = timeLabel;
    }else{
    let distance = now - dline;

    // In lesbare Zeit umwandeln
    let countdDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    let countHours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let countMinutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    let countSeconds = Math.floor(distance % (1000 * 60) / 1000);

    let currentTime = addZeroUnderTen(hour)  + ":" + addZeroUnderTen(minutes)  + ":" + addZeroUnderTen(seconds) ;
        const timeLabel = `${addZeroUnderTen(countdDays)} T | ${addZeroUnderTen(countHours)} Std | ${addZeroUnderTen(countMinutes)} Min | ${addZeroUnderTen(countSeconds)} Sek`;
        document.getElementById(id).innerHTML = timeLabel;
        document.getElementById(id).style.color = 'red'
    }
    document.getElementById("current_Time").innerHTML = currentTime;
}

function deleteCountdown(rawId) {
    const id = splitVal(rawId + '', '_', 1);
    const index = getIndex(id);
    const countdownTitle = splitVal(countdowns[index].event + '', ';', 0);
    const deleteRequest = window.confirm(`Soll der Countdown: "${countdownTitle}" wirklich gelöscht werden?`)
    if(deleteRequest) {
        countdowns.splice(index,1);
        save_Deadline();
        location.reload();
    }
}

function gotoCountdown(rawId) {
    const id = splitVal(rawId + '', '_', 1);
    const index = getIndex(id);
    window.location = "index.html#p1";

    currentCountdown = index;
    const arrVal = countdowns[index].event;
    document.getElementById("bez").innerHTML = splitVal(arrVal,';', 0);
    document.getElementById("deadline").innerHTML = splitVal(arrVal,';', 1);
    countDownDate = new Date(countdowns[index].deadline).getTime();
    showHideNavibuttons();
    save_last_Pos();
}

function getIndex(id) {
    for(let i = 0; i< countdowns.length; i++) {
        if(countdowns[i].id === id) {
            return i;
        }
    }
}



function changeDate() {
    console.log(currentCountdown);
    window.location = "index.html#p2";
    const eventName = splitVal(countdowns[currentCountdown].event + '', ';', 0);
    const eventDeadline = splitVal(countdowns[currentCountdown].event + '', ';', 1);
    document.getElementById("txtEvent").value = eventName;
    isNewEvent = false;
}
