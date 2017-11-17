import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";

import * as util from "../common/utils";

clock.granularity = "seconds";

let time = document.getElementById("time");
let date = document.getElementById("date");
let weekday = document.getElementById("weekday");

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function updateClock() {
  let today = new Date();
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());

  time.text = `${hours==0?12:hours<=12?hours:hours-12}:${mins}`;
  date.text = `${months[today.getMonth()]} ${today.getDate()}`;
  // weekday.text = 'Wednesday'
  weekday.text = `${weekdays[today.getDay()]}`

}

clock.ontick = () => {
  updateClock()
};

function updateHeartRate() {
  var hrm = new HeartRateSensor();
  let showHrm = document.getElementById("hrm");

  hrm.onreading = function() {
    showHrm.text = hrm.heartRate
    console.log("Current heart rate: " + hrm.heartRate);
    hrm.stop();
  }
  hrm.start();
}

setInterval(updateHeartRate, 500)
