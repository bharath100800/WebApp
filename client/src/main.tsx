import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider enableSystem={false} defaultTheme="light">
    <App />
  </ThemeProvider>
);
