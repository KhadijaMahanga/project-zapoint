import PropTypes from "prop-types";
import React from "react";

import Hero from "@/jikopoint/components/Hero";
import HighlightCourses from "@/jikopoint/components/HighlightCourses";
import HighlightNews from "@/jikopoint/components/HighlightNews";
import NewsletterSubscription from "@/jikopoint/components/NewsletterSubscription";
import Page from "@/jikopoint/components/Page";
import Partners from "@/jikopoint/components/Partners";
import formatBlocksForSections from "@/jikopoint/functions/formatBlocksForSections";
import getPostTypeArchive from "@/jikopoint/functions/postTypes/getPostTypeArchive";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

function Index({ articles, blocks, ...props }) {
  return (
    <Page {...props}>
      <Hero {...blocks?.hero} />
      <HighlightNews
        items={articles}
        title="Jiko News"
        subtitle="Fuatilia Machapisho yetu "
      />
      <NewsletterSubscription />
      <HighlightCourses
        items={articles}
        title="Jiko Class"
        subtitle="Tujifunze Mapishi pamoja"
      />
      <Partners />
    </Page>
  );
}

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "/" },
    postType,
    preview,
    previewData
  );

  const { posts: articles } = await getPostTypeArchive("post");

  if (notFound) {
    return {
      notFound,
    };
  }
  const blocks = formatBlocksForSections(props?.post?.blocks ?? []);
  return {
    props: {
      ...props,
      blocks,
      articles,
    },
    revalidate,
  };
}

Index.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  blocks: PropTypes.shape({
    hero: PropTypes.shape({}),
  }),
};

Index.defaultProps = {
  articles: undefined,
  blocks: undefined,
};

export default Index;
