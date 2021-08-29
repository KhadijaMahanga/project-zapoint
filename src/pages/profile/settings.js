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

  const { user } = session;

  const categories = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/profile`
  );

  const users = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`);

  let courses;
  if (user.role === "trainee") {
    // pull all enrolled courses
  } else if (user.role === "trainer") {
    // get my courses
    courses = await fetcher(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/instructor/${user.id}`
    );
  } else {
    // get all courses, as you're an admin
    courses = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`);
  }

  return {
    props: {
      courses: courses?.data ?? null,
      user,
      categories: categories?.data ?? null,
      users: users?.users ?? null,
    },
  };
}

export default Profile;
