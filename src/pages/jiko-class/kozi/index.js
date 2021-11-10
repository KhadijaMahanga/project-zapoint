import React from "react";

import CoursesPage from "@/jikopoint/components/CoursesPage";
import Page from "@/jikopoint/components/Page";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";
import fetcher from "@/jikopoint/utils/fetcher";

function Index({ ...props }) {
  return (
    <Page {...props}>
      <CoursesPage {...props} />
    </Page>
  );
}

export async function getServerSideProps() {
  const postType = "page";
  const { props } = await getPostTypeStaticProps(
    { slug: "jiko-class" },
    postType
  );

  const courses = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`
  );

  return {
    props: {
      ...props,
      courses: courses?.data ?? null,
    },
  };
}

export default Index;
