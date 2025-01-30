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
  const fullscreenButton = document.querySelector("button.ytp-fullscreen-button");

  if (!fullscreenButton) {
    console.error("Fullscreen button not found!");
    return;
  }

  fullscreenButton.addEventListener(
    "click",
    () => {
      // Wait for YouTube to process fullscreen
      setTimeout(() => {
        const clock = document.getElementById("fullscreen-clock");
        if (document.fullscreenElement) {
          clock.style.display = "block"; // Show clock
          updateClock();
          if (!clock.dataset.intervalSet) {
            clock.dataset.intervalSet = true; // Avoid multiple intervals
            setInterval(updateClock, 1000); // Update clock every second
          }
        } else {
          clock.style.display = "none"; // Hide clock
        }
      }, 100); // Slight delay to ensure fullscreen detection
    },
    false // Ensure this listener doesn’t block default behavior
  );
}

// Add the clock element to the page
createClockElement();

// Wait for the page to fully load and attach the event listener
window.addEventListener("load", () => {
  extendFullscreenBehavior();
});
