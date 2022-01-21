import { getSession } from "next-auth/react";
import React from "react";

import CoursesPage from "@/jikopoint/components/CoursesPage";
import Page from "@/jikopoint/components/Page";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";
import fetcher from "@/jikopoint/utils/fetcher";

function Index({ ...props }) {
  return (
    <Page {...props} archive>
      <CoursesPage {...props} />
    </Page>
  );
}

export async function getServerSideProps({ req }) {
  const postType = "page";
  const { props } = await getPostTypeStaticProps(
    { slug: "jiko-class" },
    postType
  );

  const post = {
    seo: {
      title: "Jiko Class",
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/jiko-class/kozi`,
      metaRobotsNofollow: "follow",
      metaRobotsNoindex: "index",
      openGraph: {
        title: "Jiko Class",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/jiko-class/kozi`,
      },
      twitter: {
        cardType: "player",
      },
    },
  };

  const courses = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`
  );

  const session = await getSession({ req });

  return {
    props: {
      ...props,
      post,
      session,
      courses: courses?.data ?? null,
      opengraphType: "website",
    },
  };
}

export default Index;
