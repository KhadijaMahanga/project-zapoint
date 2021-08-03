import { gql } from "@apollo/client";

const ARTICLES_QUERY = gql`
  query Posts($start: Int!, $limit: Int!) {
    articles(start: $start, limit: $limit, sort: "published_at:desc") {
      date: published_at
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

export default ARTICLES_QUERY;
