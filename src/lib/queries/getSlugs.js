import { gql } from "@apollo/client";

const PATH_SLUG_QUERY = gql`
  query Category($start: Int!, $limit: Int!) {
    categories {
      slug
      articles(start: $start, limit: $limit, sort: "published_at:desc") {
        slug
        id
      }
    }
  }
`;

export default PATH_SLUG_QUERY;
