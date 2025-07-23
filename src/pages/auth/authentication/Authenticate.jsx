import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router";

// ================================|| Authenticate ||================================ //

const Authenticate = () => {
  const auth = useSelector((state) => state.auth);
  // if (!auth.isLoggedIn) {
  //   return <Navigate to="/auth/login" replace />;
  // }
  return <Outlet />;
};

export default Authenticate;
