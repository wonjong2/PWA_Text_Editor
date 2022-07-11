const butInstall = document.getElementById('buttonInstall');
let deferredPrompt = null;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    deferredPrompt = event;
    // Display 'Install!' button
    butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
    console.log('👍', 'click', event);
    if (!deferredPrompt) {
        return;
    }
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            // Hide 'Install!' button
            butInstall.classList.toggle('hidden', true);
        }
    });
    deferredPrompt = null;
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
    console.log('👍', 'appinstalled', event);
});
