/* eslint-disable no-underscore-dangle */
import { getSession } from "next-auth/client";
import React from "react";

import UserAccount from "@/jikopoint/components/Account";
import Page from "@/jikopoint/components/Page";
import fetcher from "@/jikopoint/utils/fetcher";

function Account(props) {
  return (
    <Page>
      <UserAccount {...props} />
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

  const categories = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
  );

  const currentUser = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${session?.user?.email}`
  );

  let users;
  let courses;
  if (session.user.role === "trainee") {
    // pull all enrolled courses
  } else if (session.user.role === "trainer") {
    // get my courses
    courses = await fetcher(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/instructor/${currentUser?.user?._id}`
    );
  } else {
    // get all courses, as you're an admin
    users = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`);
    courses = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`);
  }

  return {
    props: {
      courses: courses?.data ?? null,
      user: currentUser?.user,
      categories: categories?.data ?? null,
      users: users?.users ?? null,
    },
  };
}

export default Account;
