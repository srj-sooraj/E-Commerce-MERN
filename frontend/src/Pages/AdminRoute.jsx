// import React from "react";
// import { Navigate } from "react-router";

// const AdminRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token || user?.role !== "admin") {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default AdminRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userInfo?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;