/* eslint-disable no-underscore-dangle */
import { getSession } from "next-auth/client";
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
  const { req, res } = context;
  const session = await getSession({ req });

  if (!(session && res && session?.user)) {
    res.writeHead(302, {
      Location: "/auth/ingia",
    });
    res.end();
    return null;
  }

  const currentUser = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${session?.user?.email}`
  );

  const userProfile = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/${currentUser?.user?._id}`
  );

  return {
    props: {
      user: currentUser?.user ?? null,
      profile: userProfile?.data ?? null,
    },
  };
}

export default Profile;
