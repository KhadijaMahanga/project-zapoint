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

export async function getStaticPaths() {
  const courses = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`
  );
  const paths =
    (courses?.success &&
      courses?.data?.map(({ _id }) => {
        return {
          params: {
            id: _id,
          },
        };
      })) ||
    [];
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const id = context?.params?.id;
  const course = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`
  );

  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${course?.data?.instructor}`
  );

  const cat = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${course?.data?.category}`
  );
  console.log(user);
  return {
    props: {
      course: course?.data ?? null,
      owner: user?.user ?? null,
      category: cat?.data ?? null,
    },
  };
}

export default Course;
