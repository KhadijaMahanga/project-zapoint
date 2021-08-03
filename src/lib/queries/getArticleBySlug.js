import { gql } from "@apollo/client";

const ARTICLE_QUERY = gql`
  query Post($slug: String!) {
    articles(where: { slug: $slug }) {
      published_at
      author {
        name
      }
      content
      title
      description
      category {
        name
        slug
      }
      slug
      image {
        url
        alternativeText
      }
    }
  }
`;

export default ARTICLE_QUERY;
