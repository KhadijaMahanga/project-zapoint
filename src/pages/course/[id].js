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

  return {
    props: {
      course: course?.data,
    },
  };
}

export default Course;
