import { signIn, signOut, useSession } from "next-auth/client";
import { useState, useEffect } from "react";

function useAuth() {
  const [session, loading] = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!session) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    return () => setIsAuthenticated(false);
  }, [session]);

  return {
    isAuthenticated,
    session,
    loading,
    signIn,
    signOut,
  };
}

export default useAuth;
