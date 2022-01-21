/* eslint-disable no-underscore-dangle */
import { getSession } from "next-auth/react";
import React from "react";

import Page from "@/jikopoint/components/Page";
import UserProfile from "@/jikopoint/components/Profile";
import fetcher from "@/jikopoint/utils/fetcher";

function Profile(props) {
  return (
    <Page>
      <UserProfile {...props} />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!(session && session?.user)) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/ingia",
      },
    };
  }

  const userProfile = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/user/${session?.user?.email}`,
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
      method: "GET",
    }
  );

  return {
    props: {
      session,
      profile: userProfile?.data ?? null,
    },
  };
}

export default Profile;
