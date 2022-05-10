import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import ReservationsPage from "./pages/ReservationsPage";
import ReservePage from "./pages/ReservePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/book" element={<ReservePage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
