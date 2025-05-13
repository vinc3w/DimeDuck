import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "@mui/material";
import { theme } from "@app/provider";
import { store } from "@app/store";
import Router from "@app/router";
import FlashMessages from "@components/ui/flash-messages";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@styles/global.css";

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <FlashMessages />
          <Router />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
