/* eslint-disable no-underscore-dangle */
import { getSession } from "next-auth/react";
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
  const session = await getSession(context);
  if (!(session && session?.user)) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/ingia",
      },
    };
  }

  const categories = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
  );

  const currentUser = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${session?.user?.email}`
  );
  let users;
  let courses = {};
  if (session.user.role === "trainee") {
    // pull all enrolled courses
    const enrolCourses = await fetcher(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/enrolment/student/${currentUser?.user?._id}`
    );
    courses.data = enrolCourses?.data?.map(({ enrolmentId, course }) => {
      return { ...course, enrolmentId };
    });
  } else if (session.user.role === "trainer") {
    // get my courses
    courses = await fetcher(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/instructor/${currentUser?.user?._id}`
    );
  } else {
    // get all courses, as you're an admin
    users = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`);
    courses = await fetcher(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/admin`
    );
  }

  return {
    props: {
      session,
      courses: courses?.data ?? null,
      user: { ...currentUser?.user, role: session?.user?.role ?? "trainee" },
      categories: categories?.data ?? null,
      users: users?.users ?? null,
    },
  };
}

export default Account;
