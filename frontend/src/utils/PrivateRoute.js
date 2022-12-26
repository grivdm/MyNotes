import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react"; 
import AuthContext from "../context/AuthContext";


const PrivateRoute = ({ children, ...rest }) => {

  console.log("Private page working");
  let {user} = useContext(AuthContext)
  // console.log(user)
  return (
    <Routes>
      <Route
        {...rest}
        element={!user ? <Navigate to="/login" /> : children}
      />
    </Routes>
  );
};

export default PrivateRoute;
