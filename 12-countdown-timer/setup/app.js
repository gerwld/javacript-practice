const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const text = document.querySelector('.giveway');
const items = document.querySelectorAll('.deadline-format h4');
const deadline = document.querySelector('.deadline');

//deadline
let futureDate = new Date(2023, 4, 5, 12, 00, 0);

const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];

const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();


text.textContent = `giveway ends on ${weekday} ${date} ${month} ${year}, ${hours}:${minutes}AM`;

let featureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureDate - today;

  //values in ms
  const oneDay = 86400000;
  const oneHour = 3600000;
  const oneMinute = 60000;
  const oneSecond = 1000;

  //calculate all values
  const days = Math.floor(t / 86400000);
  const hours = Math.floor((t / 3600000) % 24);
  const minutes = Math.floor((t / 60000) % 60);
  const seconds = Math.floor((t / 1000) % 60);

  //format value < 10
  function format(value) {
    if(value < 10) {
      return `0${value}`;
    }
    return value;
  }

  //set values to the elements
  const values = [days, hours, minutes, seconds];
  items.forEach(function(element, index){
    element.textContent = format(values[index]);
  });
  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4>Giveway has expired!</h4>`;
  }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();