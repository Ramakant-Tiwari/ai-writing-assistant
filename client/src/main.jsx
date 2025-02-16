import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App";
import ai from "./images/ai.png";

const root = createRoot(document.getElementById("root"));

console.log("Privy App ID:", import.meta.env.VITE_PRIVY_APP_ID); // Verify in console

root.render(
  <PrivyProvider
    appId={String(import.meta.env.VITE_PRIVY_APP_ID)} // Explicit string conversion
    config={{
      loginMethods: ["email", "google", "twitter", "github"],
      appearance: {
        theme: "dark",
        accentColor: "#676FFF",
        logo: ai,
      },
    }}
  >
    <App />
  </PrivyProvider>
);
