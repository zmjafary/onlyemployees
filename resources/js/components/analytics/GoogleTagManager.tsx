import { useEffect } from "react";

interface GoogleTagManagerProps {
  id: string; // Google Tag Manager ID (e.g., G-RL3H9C5QR6)
}

const GoogleTagManager = ({ id }: GoogleTagManagerProps) => {
  useEffect(() => {
    // Skip if no GTM ID is provided or if running in development mode
    if (!id || import.meta.env.DEV) return;

    // Add the gtag.js script to the head
    const scriptElement = document.createElement("script");
    scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    scriptElement.async = true;
    document.head.appendChild(scriptElement);

    // Add the gtag initialization script
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    `;
    document.head.appendChild(inlineScript);

    return () => {
      // Cleanup function to remove scripts
      document.head.removeChild(scriptElement);
      document.head.removeChild(inlineScript);
    };
  }, [id]);

  return null; // This component doesn't render anything visible
};

export default GoogleTagManager;
