import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    setAllowed(!!user);
    setLoading(false);
  });

  return () => unsub();
}, []);


  if (loading) return <p>Checking access...</p>;

  return allowed ? children : <Navigate to="/admin" replace />;
};

export default ProtectedAdminRoute;
