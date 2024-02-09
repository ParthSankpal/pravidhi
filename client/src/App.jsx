import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import WareHouseSignIn from "./pages/WareHouseSignIn";
import Search from "./pages/Search";
import WareHouseSignUp from "./pages/WareHouseSignUp";
import FarmerDashboard from "./pages/FarmerDashboard"


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/warehose-signUp" element={<WareHouseSignUp />} />
        <Route path="/warehose-signIn" element={<WareHouseSignIn />} />
        
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search />} />
        {/* <Route path="/listing/:listingId" element={<Listing/>}/> */}

        <Route element={<PrivateRoute />}>
          <Route path="/farmer-dashboard" element={<FarmerDashboard/>} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
