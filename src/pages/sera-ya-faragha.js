import PropTypes from "prop-types";
import React from "react";

import Page from "@/jikopoint/components/Page";
import RichContent from "@/jikopoint/components/RichContent";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

function Sera({ ...props }) {
  return (
    <Page {...props}>
      <RichContent {...props?.post} />
    </Page>
  );
}

Sera.propTypes = {
  post: PropTypes.shape({}),
};

Sera.defaultProps = {
  post: undefined,
};

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "sera-ya-faragha" },
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
      opengraphType: "article",
    },
    revalidate,
  };
}

export default Sera;
