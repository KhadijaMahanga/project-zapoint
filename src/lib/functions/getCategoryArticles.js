import { addApolloState } from "@/jikopoint/lib/apolloConfig";
import { initializeStrapiApollo } from "@/jikopoint/lib/connector";
import CATEGORY_ARTICLES_QUERY from "@/jikopoint/lib/queries/getCategoryArticles";

export default async function getCategoryArticles(slug, limit = 10, start = 0) {
  const query = CATEGORY_ARTICLES_QUERY;
  const apolloClient = initializeStrapiApollo();

  // Set revalidate length (seconds).
  const revalidate = 60 * 3;
  const response = {
    articles: null,
    error: false,
    errorMessage: null,
  };

  const variables = { start, limit, slug };

  await apolloClient
    .query({ query, variables })
    .then(({ data }) => {
      if (!data) {
        response.error = true;
        response.errorMessage =
          "An error occurred while trying to retrieve articles";
        return null;
      }
      const {
        categories: [articles],
        headers,
      } = data;
      response.articles = articles.articles;
      response.headers = headers;

      return null;
    })
    .catch((error) => {
      response.error = true;
      response.errorMessage = error.message;
    });

  return addApolloState(apolloClient, {
    props: {
      ...response,
      archive: true,
    },
    revalidate,
  });
}
