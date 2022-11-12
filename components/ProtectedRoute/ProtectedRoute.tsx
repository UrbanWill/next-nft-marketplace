import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      push("/");
    }
  }, [isAuthenticated, push, isLoading]);

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
