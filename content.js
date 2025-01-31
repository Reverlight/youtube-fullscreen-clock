function createClockElement() {
  const clock = document.createElement("div");
  clock.id = "fullscreen-clock";
  document.body.appendChild(clock);

  clock.style.display = "none"; // Hide initially
}

function updateClock() {
  const clock = document.querySelector("#fullscreen-clock"); // Use querySelector to get clock
  if (clock) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Exclude seconds
    clock.textContent = timeString;
  }
}

// Extend fullscreen behavior without overriding the default functionality
function extendFullscreenBehavior() {
  document.addEventListener('fullscreenchange', (event) => {
    
    const clock = document.querySelector("#fullscreen-clock"); 
    // Use querySelector to get clock

    
    if (document.fullscreenElement) {
      if (clock) {
        clock.style.display = "block"; // Show the clock when fullscreen is active
      }
    } else {
      if (clock) {
        clock.style.display = "none"; // Hide the clock when exiting fullscreen
      }
    }
  });
}

function startClockUpdates() {
  updateClock(); // Update immediately
  setInterval(updateClock, 10000); // Update every 10 seconds
}

// Add the clock element to the page


// Wait for the page to fully load and attach the event listener
window.addEventListener("load", () => {
  createClockElement();
  extendFullscreenBehavior();
  startClockUpdates();
});
