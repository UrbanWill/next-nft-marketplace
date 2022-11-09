import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push("/");
    }
  }, [isAuthenticated, push]);

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
