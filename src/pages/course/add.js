import React from "react";

import Add from "@/jikopoint/components/Course/Add";
import Page from "@/jikopoint/components/Page";
import fetcher from "@/jikopoint/utils/fetcher";

function Course(props) {
  return (
    <Page>
      <Add {...props} />
    </Page>
  );
}

export async function getServerSideProps() {
  const categories = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
  );

  return {
    props: {
      categories: categories?.data,
    },
  };
}

export default Course;
