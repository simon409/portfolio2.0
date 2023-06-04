import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./components/layout/Index";
import Layout from "./components/layout/Layout";

const App = () => {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  );
};

export default App;
