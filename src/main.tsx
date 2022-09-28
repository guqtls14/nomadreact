import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
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
