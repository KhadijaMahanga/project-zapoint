/* eslint-disable no-underscore-dangle */
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
  const id = context?.params?.id;
  const course = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`
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
    },
  };
}

export default Course;
