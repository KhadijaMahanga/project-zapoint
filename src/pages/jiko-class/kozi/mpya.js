import { getSession } from "next-auth/react";
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

  if (session?.user?.role !== "trainer") {
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
      session,
      categories: categories?.data,
      user: user?.user ?? null,
    },
  };
}

export default Course;
