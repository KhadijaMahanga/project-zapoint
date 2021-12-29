import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [providers, setProviders] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchProviders() {
      const p = await getProviders();
      setProviders(p);
    }
    fetchProviders();
    if (!session) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    return () => setIsAuthenticated(false);
  }, [session]);

  return {
    isAuthenticated,
    providers,
    session,
    loading,
    signIn,
    signOut,
  };
}

export default useAuth;
