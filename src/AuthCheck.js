import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/userSlice";

const AuthCheck = () => {
  const dispatch = useDispatch();
  const expiresAt = useSelector((state) => state.user.expiresAt);

  useEffect(() => {
    if (expiresAt) {
      const now = Date.now();
      const timeLeft = expiresAt - now;

      if (timeLeft <= 0) {
        dispatch(logout()); // Auto logout if expired
      } else {
        // Set timeout to log out when token expires
        const timer = setTimeout(() => {
          dispatch(logout());
        }, timeLeft);

        return () => clearTimeout(timer);
      }
    }
  }, [expiresAt, dispatch]);

  return null; // This component just runs the effect
};

export default AuthCheck;
