import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loader } from "atoms";
import ErrorPage from "pages/error-page";
import Home from "pages/home";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" exact element={<Home />} />        
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};