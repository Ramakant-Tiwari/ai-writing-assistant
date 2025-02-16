import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App";
import ai from "./images/ai.png";

const root = createRoot(document.getElementById("root"));

root.render(
  <PrivyProvider
    appId="cm7367t9602cp13vt0qodsam6"
    config={{
      // Display email and wallet as login methods
      loginMethods: ["email", "google", "twitter", "github"],
      // Customize Privy's appearance in your app
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
