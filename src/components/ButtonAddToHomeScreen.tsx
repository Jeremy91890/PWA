import React, { useEffect, useState } from "react";

const ButtonAddToHomeScreen: React.FC = () => {
  const [supportsPwa, setSupportsPwa] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<any | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPwa(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }

    promptInstall.prompt();
    const choiceResult = await promptInstall.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }

    setPromptInstall(null);
  };

  return (
    <button
      onClick={handleInstallClick}
      style={{ display: supportsPwa ? "block" : "none" }}
    >
      Install App
    </button>
  );
};

export default ButtonAddToHomeScreen;
