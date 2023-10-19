// Get a reference to the HTML element with the ID 'buttonInstall'
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA

// This event is triggered when the browser detects a PWA can be installed
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the triggered events in the 'deferredPrompt' variable
  window.deferredPrompt = event;

  // Remove the 'hidden' class from the 'butInstall' button to make it visible
  butInstall.classList.toggle("hidden", false);
});

// This event handler should trigger the PWA installation prompt
butInstall.addEventListener("click", async () => {
  // Retrieve the 'beforeinstallprompt' event object from 'window.deferredPrompt'
  const promptEvent = window.deferredPrompt;

  // Check if the 'beforeinstallprompt' event exists
  if (!promptEvent) {
    return; // If not, exit the function
  }

  // Show the PWA installation prompt
  promptEvent.prompt();

  // Reset the 'deferredPrompt' variable to null since it can only be used once
  window.deferredPrompt = null;

  // Hide the 'butInstall' button by adding the 'hidden' class
  butInstall.classList.toggle("hidden", true);
});

// This event is triggered after the PWA has been installed
window.addEventListener("appinstalled", (event) => {
  // Clear the 'deferredPrompt' variable as it's no longer needed
  window.deferredPrompt = null;
});
