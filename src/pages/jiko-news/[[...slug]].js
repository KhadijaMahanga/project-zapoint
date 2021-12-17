import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import NewsNavigation from "@/jikopoint/components/Navigation/NewsNavigation";
import NewsContent from "@/jikopoint/components/NewsContent";
import NewsList from "@/jikopoint/components/NewsList";
import Page from "@/jikopoint/components/Page";
import formatBlocksForSections from "@/jikopoint/functions/formatBlocksForSections";
import getCategories from "@/jikopoint/functions/getCategories";
import getPostTypeStaticPaths from "@/jikopoint/functions/postTypes/getPostTypeStaticPaths";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

// Define route post type.
const postType = "post";

function Index({ posts, post, categories, archive, activeCategory, ...props }) {
  const theme = useTheme();
  let pageLimit = 3;
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  if (isUpMd && !isUpLg) {
    pageLimit = 6;
  }
  if (isUpLg) {
    pageLimit = 9;
  }

  let authorName = `${post?.author?.node?.firstName ?? ""} ${
    post?.author?.node?.lastName ?? ""
  }`;
  if (authorName?.length < 2) {
    authorName = post?.author?.node?.nickname ?? post?.author?.node?.slug;
  }

  if (post?.customAuthor?.anonymous) {
    authorName = "Mwandishi Wetu";
  }

  return (
    <Page
      categories={categories}
      active={activeCategory}
      {...props}
      post={post}
    >
      <NewsNavigation categories={categories} active={activeCategory} />
      {archive ? (
        <NewsList
          news={posts}
          category={activeCategory}
          pageLimit={pageLimit}
          {...props}
        />
      ) : (
        <NewsContent
          {...post}
          description={post?.excerpt?.replace(/<[^>]+>/g, "") ?? ""}
          author={authorName}
          image={post?.featuredImage?.node?.sourceUrl}
        />
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  return getPostTypeStaticPaths(postType);
}

export async function getStaticProps({ params, preview, previewData }) {
  const [activeCategory] = params?.slug ?? [""];
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    params,
    postType,
    preview,
    previewData
  );

  const categories = await getCategories();

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
      categories,
      activeCategory,
      opengraphType: "article",
    },
    revalidate,
  };
}

Index.propTypes = {
  post: PropTypes.shape({
    excerpt: PropTypes.string,
    author: PropTypes.shape({
      node: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        nickname: PropTypes.string,
        slug: PropTypes.string,
      }),
    }),
    customAuthor: PropTypes.shape({
      anonymous: PropTypes.bool,
    }),
    featuredImage: PropTypes.shape({
      node: PropTypes.shape({
        sourceUrl: PropTypes.string,
      }),
    }),
  }),
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  archive: PropTypes.bool,
  activeCategory: PropTypes.string,
};

Index.defaultProps = {
  posts: undefined,
  post: undefined,
  categories: undefined,
  archive: undefined,
  activeCategory: undefined,
};

export default Index;
