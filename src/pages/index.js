import PropTypes from "prop-types";
import React from "react";

import Hero from "@/jikopoint/components/Hero";
import HighlightCourses from "@/jikopoint/components/HighlightCourses";
import HighlightNews from "@/jikopoint/components/HighlightNews";
import NewsletterSubscription from "@/jikopoint/components/NewsletterSubscription";
import Page from "@/jikopoint/components/Page";
import Partners from "@/jikopoint/components/Partners";
import getPostTypeArchive from "@/jikopoint/functions/postTypes/getPostTypeArchive";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

function Index({ articles, ...props }) {
  return (
    <Page {...props}>
      <Hero
        ctaText="Kuwa Mkufunzi"
        href="/kuwa-mkufunzi"
        title="Jikoni"
        subtitle={["kupika pilau", "kuchoma chapati", "kukanda ngano"]}
        tagline="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula. Nullam augue augue, dignissim id bibendum id, consequat et leo. Curabitur viverra tincidunt nulla nec tempor nullam augue augue."
      />
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
  // enhancement
  // const blocks = formatBlocksForSections(props?.post?.blocks?? []);
  return {
    props: {
      ...props,
      articles,
    },
    revalidate,
  };
}

Index.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  articles: undefined,
};

export default Index;
