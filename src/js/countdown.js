const countdown = document.querySelectorAll('[data-js-countdown]');

/**
 * Change number to string with leading zero support for timer
 * @param {number} number 
 * @returns {string}
 */
function leadingZeroesString(number) {
  let n = number.toString();
  if (n.length < 2) { n = `0${n}`; }
  return n;
}

/**
 * Countdown timer setup
 * @param {DOMElement} element 
 */
function countdownTimer(element) {
  const timeNow = new Date();
  let cutoff = new Date(`${timeNow.getMonth() + 1} ${timeNow.getDate()}, ${timeNow.getFullYear()} 17:00:00`);
  let timeUntilDeliveryCutoff;
  
  if (timeNow.getDay() === 0) {
    // if sunday, change to monday delivery deadline
    cutoff.setDate(cutoff.getDate() + 1);
  } else if (timeNow.getDay() === 6 && timeNow.getHours() >= 17) {
    // if saturday past 5, change to monday delivery deadline
    cutoff.setDate(cutoff.getDate() + 2);
  }
  
  // Milliseconds until next cutoff
  timeUntilDeliveryCutoff = Math.abs(cutoff - timeNow);

  // Delivery day calculating (3 days later, with added day if lands on Sunday)
  let deliveryDay = new Date(cutoff);
  deliveryDay.setDate(deliveryDay.getDate() + 3);
  if (deliveryDay.getDate() === 0) { deliveryDay.setDate(deliveryDay.getDate() + 1); }

  // Update timer if it is in DOM
  if (element.querySelector('[data-js-countdown-timer]')) { 
    const seconds = leadingZeroesString(Math.floor((timeUntilDeliveryCutoff / 1000) % 60));
    const minutes = leadingZeroesString(Math.floor((timeUntilDeliveryCutoff / (1000 * 60)) % 60));
    const hours = leadingZeroesString(Math.floor((timeUntilDeliveryCutoff / (1000 * 60 * 60)) % 24));

    element.querySelector('[data-js-countdown-timer]').innerHTML = `${hours}:${minutes}:${seconds}`;
  }

  // Update delivery day if it is in DOM
  if (element.querySelector('[data-js-countdown-delivery-day]') 
    && element.querySelector('[data-js-countdown-delivery-day]').innerHTML !== ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][deliveryDay.getDay()]) {
    element.querySelector('[data-js-countdown-delivery-day]').innerHTML = `${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][deliveryDay.getDay()]}`;
  }
}

if (countdown.length > 0) {

  [...countdown].forEach(element => {
    countdownTimer(element);

    let interval = setInterval(() => {
      countdownTimer(element);
    }, 1000);
  });

}