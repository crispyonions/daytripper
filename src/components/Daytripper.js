import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Authorized } from "./views/Authorized";
import { NavBar } from "./nav/NavBar";
import { TripFinder } from "./views/TripFinder";
import { SaveTrips } from "./views/SaveTrips";
import { SuggestTrip } from "./views/SuggestTrip";
import "./Daytripper.css";

export const Daytripper = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <Authorized>
            <NavBar />
            <Routes>
              <Route path="/" element={<TripFinder />} />
              <Route path="/savedtrips" element={<SaveTrips />} />
              <Route path="/suggesttrip" element={<SuggestTrip />} />

            </Routes>
          </Authorized>
        }
      />
    </Routes>
  );
};
