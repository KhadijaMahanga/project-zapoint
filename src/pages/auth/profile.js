import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Page from "@/jikopoint/components/Page";
import useAuth from "@/jikopoint/hooks/useAuth";

function Profile() {
  const { isAuthenticated, session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!(isAuthenticated || loading)) {
      router.push("/auth/login");
    }
  });

  // Prevent unauth flash
  if (!session) {
    return null;
  }

  return (
    <Page>
      <div>Profile Page</div>
      <h1>{`Name: ${session?.user?.firstName} ${session?.user?.lastName}`}</h1>
    </Page>
  );
}

export default Profile;
