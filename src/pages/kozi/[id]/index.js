/* eslint-disable no-underscore-dangle */
import { getSession, getProviders, getCsrfToken } from "next-auth/client";
import React from "react";

import SingleCourse from "@/jikopoint/components/Course";
import Page from "@/jikopoint/components/Page";
import fetcher from "@/jikopoint/utils/fetcher";

function Course(props) {
  return (
    <Page>
      <SingleCourse {...props} />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { params, req } = context;
  const session = await getSession({ req });
  const providers = await getProviders(context);
  const csrfToken = await getCsrfToken(context);
  const { id } = params;
  const course = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`
  );

  if (!course?.success || !course?.data) {
    return {
      notFound: true,
    };
  }

  const lectures = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/lectures/course/${id}`
  );

  // const profile = await fetcher(
  //   `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/${course?.data?.instructor?._id}`
  // );

  const cat = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${course?.data?.category}`
  );
  return {
    props: {
      course: course?.data ?? null,
      category: cat?.data ?? null,
      lectures: lectures?.data ?? null,
      session,
      providers,
      csrfToken,
    },
  };
}

export default Course;
