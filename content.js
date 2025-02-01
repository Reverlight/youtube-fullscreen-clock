const clockId = 'fullscreen-clock';
const timeParams = { hour: '2-digit', minute: '2-digit' };
const disableClockFeatureKey = 'p';
let clockDisabled = false;
let clock;


function createClockElement() {
  clock = document.createElement("div");
  clock.id = clockId;
  document.body.appendChild(clock);
  clock.style.display = "none";
}

function updateClock() {
  if (clock) {
    let now = new Date();
    let timeString = now.toLocaleTimeString([], timeParams);
    clock.textContent = timeString;
  }
}

function extendFullscreenBehavior() {
  document.addEventListener('fullscreenchange', (event) => {
    if (clockDisabled === true){
      return;
    }
    if (document.fullscreenElement) {
      clock.style.display = "block";
    } else {
      clock.style.display = "none";
    }
  });
}

function disableClockFeature() {
  document.addEventListener('keydown', (event) => {
    if (event.key != disableClockFeatureKey) {
      return;
    }
    if (clockDisabled === false) {
      clock.style.display = "none"; 
      clockDisabled = true;
    }
    else {
      clockDisabled = false;
      clock.style.display = "block";
    }
  });
}


window.addEventListener("load", () => {
  createClockElement();
  extendFullscreenBehavior();
  disableClockFeature()
  setInterval(updateClock, 10000);
});
