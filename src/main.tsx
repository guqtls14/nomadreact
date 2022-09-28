import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "styled-components";

import { RecoilRoot } from "recoil";
import { darktheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RecoilRoot>
      <ThemeProvider theme={darktheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ThemeProvider } from "styled-components";
// import App from "./App";
// import { theme } from "./theme";

// const queryClient = new QueryClient();

// ReactDOM.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider theme={theme}>
//         <App />
//       </ThemeProvider>
//     </QueryClientProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
