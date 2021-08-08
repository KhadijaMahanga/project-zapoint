import { useRouter } from "next/router";
import React from "react";

import Page from "@/jikopoint/components/Page";
import useAuth from "@/jikopoint/hooks/useAuth";

function Profile() {
  const { session, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!(isAuthenticated || loading)) {
  //     router.push("/auth/ingia");
  //   }
  // });

  // Prevent unauth flash
  if (!session && !loading) {
    router.push("/auth/ingia");
  }

  return (
    <Page>
      <div>Profile Page</div>
      <h1>{`Name: ${session?.user?.name} `}</h1>
    </Page>
  );
}

export default Profile;
