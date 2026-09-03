import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    return navigate("/login");
  } 
  return <Outlet />;
};

export default ProtectRoute;
