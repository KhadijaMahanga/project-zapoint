import { gql } from "@apollo/client";

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($start: Int!, $limit: Int!, $slug: String!) {
    categories(where: { slug: $slug }) {
      name
      articles(start: $start, limit: $limit, sort: "published_at:desc") {
        slug
        title
        content
        image {
          url
        }
        category {
          slug
          name
        }
      }
    }
  }
`;

export default CATEGORY_ARTICLES_QUERY;
