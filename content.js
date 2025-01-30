function createClockElement() {
  const clock = document.createElement("div");
  clock.id = "fullscreen-clock";
  document.body.appendChild(clock);

  // Basic styles for visibility
  clock.style.position = "fixed";
  clock.style.top = "20px";
  clock.style.right = "20px";
  clock.style.zIndex = "9999";
  clock.style.background = "rgba(0, 0, 0, 0.7)";
  clock.style.color = "white";
  clock.style.padding = "10px 20px";
  clock.style.borderRadius = "5px";
  clock.style.fontSize = "18px";
  clock.style.display = "none";
}

function updateClock() {
  const clock = document.getElementById("fullscreen-clock");
  if (clock) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clock.textContent = timeString;
  }
}

// Extend fullscreen behavior without overriding the default functionality
function extendFullscreenBehavior() {
  

  document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
      clock.style.display = "block"
    } else {
      clock.style.display = "none";
    }
  });

}

// Add the clock element to the page
createClockElement();

// Wait for the page to fully load and attach the event listener
window.addEventListener("load", () => {
  extendFullscreenBehavior();
});
