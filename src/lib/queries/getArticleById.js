import { gql } from "@apollo/client";

const ARTICLE_QUERY = gql`
  query Post($id: ID!) {
    articles(where: { id: $id }) {
      date: published_at
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
    headers: categories {
      slug
      name
    }
  }
`;

export default ARTICLE_QUERY;
