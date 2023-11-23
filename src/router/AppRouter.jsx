import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { firebaseAuth } from "../firebase/config";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useDispatch, useSelector } from "react-redux";
import { CheckingAuthentication } from "../ui";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";

export const AppRouter = () => {
  const { status } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
    });
  }, [dispatch]);

  if (status === "checking") {
    return <CheckingAuthentication />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} /> //Journal app
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} /> // Login y registro
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
