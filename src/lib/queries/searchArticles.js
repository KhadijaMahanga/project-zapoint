import { gql } from "@apollo/client";

const SEARCH_ARTICLES_QUERY = gql`
  query Posts($searchTerm: String!) {
    articles(
      sort: "published_at:desc"
      where: {
        _or: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
          { category: { name_contains: $searchTerm } }
        ]
      }
    ) {
      published_at
      author {
        name
      }
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

export default SEARCH_ARTICLES_QUERY;
