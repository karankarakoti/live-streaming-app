import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "atoms";
import ErrorPage from "pages/error-page";
import Home from "pages/home";
import Stream from "pages/stream";
import MyStreams from "pages/my-streams";
import Broadcasters from "pages/broadcasters";
import Profile from "pages/profile";

import { isUserLoggedIn } from "redux/actions";

export const AppRoutes = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    dispatch(isUserLoggedIn())
  }, [auth.authenticate])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" exact element={<Home />} />        
        <Route path="/stream/:id" exact element={<Stream />} />                
        <Route path="*" element={<ErrorPage />} />
        <Route path="/my-streams" exact element={<MyStreams />} />                
        <Route path="/broadcasters" exact element={<Broadcasters />} />                
        <Route path="/profile" exact element={<Profile />} />                
      </Routes>
    </Suspense>
  );
};