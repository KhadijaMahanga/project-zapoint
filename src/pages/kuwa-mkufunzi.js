import React from "react";

import Page from "@/jikopoint/components/Page";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

export default function Mkufunzi(props) {
  return <Page {...props} />;
}

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "kuwa-mkufunzi" },
    postType,
    preview,
    previewData
  );
  console.log(props);

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
