import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

// toggleDark interface
// isDark interface
interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Router = ({ toggleDark, isDark }: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart isDark={isDark} />} />
        </Route>
        <Route path="/" element={<Coins toggleDark={toggleDark} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
