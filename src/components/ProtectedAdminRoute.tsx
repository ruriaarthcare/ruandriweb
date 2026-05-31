import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">Checking access...</p>
        </div>
      </div>
    );
  }

  return allowed ? children : <Navigate to="/admin" replace />;
};

export default ProtectedAdminRoute;
