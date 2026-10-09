import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import IPOs from "./pages/IPOs";
import Analytics from "./pages/Analytics";
import IPODetails from "./pages/IPODetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/ipos"
          element={<IPOs />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/ipo/:id"
          element={<IPODetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;