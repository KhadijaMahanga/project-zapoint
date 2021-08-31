import { getSession } from "next-auth/client";
import React from "react";

import Add from "@/jikopoint/components/Course/Add";
import Page from "@/jikopoint/components/Page";
import fetcher from "@/jikopoint/utils/fetcher";

function EditCourse(props) {
  return (
    <Page>
      <Add {...props} variant="edit" />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const session = await getSession({ req });

  if (!(session && res && session?.user)) {
    res.writeHead(302, {
      Location: "/auth/ingia",
    });
    res.end();
    return null;
  }

  if (session?.user?.role !== "trainer") {
    return {
      notFound: true,
    };
  }

  const id = params?.id;
  const course = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`
  );

  if (!course?.success || !course?.data) {
    return {
      notFound: true,
    };
  }

  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${session?.user?.email}`
  );

  const categories = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
  );
  return {
    props: {
      course: course?.data ?? null,
      categories: categories?.data ?? null,
      user: user?.user ?? null,
    },
  };
}

export default EditCourse;
