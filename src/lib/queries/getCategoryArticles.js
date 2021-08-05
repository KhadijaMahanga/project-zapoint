import { gql } from "@apollo/client";

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($start: Int!, $limit: Int!, $slug: String!) {
    categories(where: { slug: $slug }) {
      slug
      articles(start: $start, limit: $limit, sort: "published_at:desc") {
        id
        date: published_at
        slug
        title
        description
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
    headers: categories {
      slug
      name
    }
  }
`;

export default CATEGORY_ARTICLES_QUERY;
