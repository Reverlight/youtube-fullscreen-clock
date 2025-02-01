class FullscreenClock {
  constructor() {
    this.clockId = 'fullscreen-clock';
    this.updateInterval = 10000; // 10 seconds
    this.clockElement = null;
    this.intervalId = null;
    this.isEnabled = true;
    this.notificationTimeout = null;
  }

  init() {
    this.createClockElement();
    this.attachEventListeners();
    this.startClockUpdates();
  }

  createClockElement() {
    this.clockElement = document.createElement('div');
    this.clockElement.id = this.clockId;
    this.clockElement.style.display = 'none';
    document.body.appendChild(this.clockElement);
  }

  updateClock() {
    if (!this.clockElement || !this.isEnabled) {
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    this.clockElement.textContent = timeString;
  }

  handleFullscreenChange() {
    if (!this.clockElement) {
      console.warn('Clock element not found');
      return;
    }

    this.clockElement.style.display = 
      (document.fullscreenElement && this.isEnabled) ? 'block' : 'none';
  }

  toggleClock() {
    this.isEnabled = !this.isEnabled;

    if (this.clockElement) {
      if (!this.isEnabled) {
        this.clockElement.style.display = 'none';
      } else if (document.fullscreenElement) {
        this.clockElement.style.display = 'block';
      }
    }

    this.showNotification();
  }

  showNotification() {
    this.clearNotification();

    const notification = document.createElement('div');
    notification.id = `${this.clockId}-notification`;
    notification.textContent = `Clock ${this.isEnabled ? 'Enabled' : 'Disabled'}`;
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px 30px;
      border-radius: 5px;
      font-size: 18px;
      z-index: 9999;
      transition: opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    this.notificationTimeout = setTimeout(() => {
      this.clearNotification();
    }, 2000);
  }

  clearNotification() {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = null;
    }

    const existingNotification = document.getElementById(`${this.clockId}-notification`);
    if (existingNotification) {
      existingNotification.style.opacity = '0';
      setTimeout(() => existingNotification.remove(), 300);
    }
  }

  handleKeyPress(event) {
    if (event.key !== 'p') return;
    this.toggleClock();
  }

  attachEventListeners() {
    document.addEventListener('fullscreenchange', 
      () => this.handleFullscreenChange()
    );

    document.addEventListener('keydown', 
      (event) => this.handleKeyPress(event)
    );
  }

  startClockUpdates() {
    this.updateClock();
    this.intervalId = setInterval(() => this.updateClock(), this.updateInterval);
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    if (this.clockElement) {
      this.clockElement.remove();
    }

    this.clearNotification();
    
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('keydown', this.handleKeyPress);
  }
}

// Initialize the clock when the page loads
window.addEventListener('load', () => {
  const clock = new FullscreenClock();
  clock.init();
});