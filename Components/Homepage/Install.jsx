import { useState, useEffect } from "react";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default prompt from appearing
      event.preventDefault();

      // Save the event for later use
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallButtonClick = () => {
    if (deferredPrompt) {
      // Show the browser's default install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        // Clear the saved prompt
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button
      id="install-btn"
      style={{ display: deferredPrompt ? "block" : "none" }}
      onClick={handleInstallButtonClick}
    >
      Install App
    </button>
  );
}

export default function MyPage() {
  return (
    <div>
      <h1>Welcome to my app!</h1>
      <InstallButton />
    </div>
  );
}
