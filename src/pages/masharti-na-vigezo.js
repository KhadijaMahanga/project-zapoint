import React from "react";

import Page from "@/jikopoint/components/Page";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

export default function Masharti(props) {
  return <Page {...props} />;
}

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "masharti-na-vigezo" },
    postType,
    preview,
    previewData
  );

  if (notFound) {
    return {
      notFound,
    };
  }

  return {
    props: {
      ...props,
    },
    revalidate,
  };
}
