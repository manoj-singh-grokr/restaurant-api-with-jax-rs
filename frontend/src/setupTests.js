import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";

const HomePage = () => {
  return <div>Home Page</div>;
};

const ReservationsPage = () => {
  return <div>Res Page</div>;
};
export function renderWithRouter(component) {
  return render(
    <BrowserRouter>
      {component}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
