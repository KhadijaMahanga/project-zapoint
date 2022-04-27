// lib/feed.ts
import { gql } from "@apollo/client";
import { Feed } from "feed";

import { initializeWpApollo } from "@/jikopoint/lib/wordpress/connector";

async function getPublishedPosts() {
  // Construct query based on post type.
  const query = gql`
    query GET_SLUGS {
      posts(first: 10000, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            uri
            date
            title
            content
            excerpt
          }
        }
      }
    }
  `;

  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo();

  // Execute query.
  const result = await apolloClient.query({ query });
  return result?.data?.posts?.edges ?? [];
}

export default async function buildFeed() {
  const baseURl = "https://jikopoint.co.tz";
  // This contains site level metadata like title, url, etc
  const feed = new Feed({
    // Global feed config
    title: "Jiko Point | Jiko News ",
    description:
      " Jiko News provides content on cooking techniques and devices which reduces the consumption of firewood and charcoal as well as kitchen running costs of LPG and electricity by suggesting energy-saving recipes, utensils and electric devices. ",
    id: `${baseURl}`,
    link: `${baseURl}`,
    language: "sw-KE",
    generator: "Next.js using Feed",
    feedLinks: {
      rss2: `${baseURl}/feed/rss`,
      atom1: `${baseURl}/feed/atom`,
      json1: `${baseURl}/feed/json`,
    },
  });

  const posts = await getPublishedPosts();
  posts.forEach((post) => {
    feed.addItem({
      title: post?.node?.title,
      link: `${baseURl}/jiko-news${post?.node?.uri}`,
      description: post?.node?.excerpt?.replace(/<[^>]+>/g, "") ?? "",
      content: post?.node?.content,
      date: new Date(post?.node?.date),
    });
  });

  return feed;
}
