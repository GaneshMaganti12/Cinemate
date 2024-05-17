import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import ResetPassword from "./components/Passwords/ResetPassword/ResetPassword";
import NewPassword from "./components/Passwords/NewPassword/NewPassword";
import ChangePassword from "./components/Passwords/ChangePassword/ChangePassword";
import Movies from "./components/Movies/Movies";
import ProtectedRoute1 from "./components/ProtectedRoute1";
import ProtectedRoute2 from "./components/ProtectedRoute2";
import MovieDetail from "./components/Movies/MovieDetail/MovieDetail";
import Watchlist from "./components/Movies/Watchlist/Watchlist";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";
import SearchMovies from "./components/Movies/SearchMovies/SearchMovies";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route element={<ProtectedRoute1 />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset/:id/:token" element={<NewPassword />} />
        </Route>
        <Route element={<ProtectedRoute2 />}>
          <Route path="/home" element={<Movies />} />
          <Route path="/results" element={<SearchMovies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
