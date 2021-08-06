import { addApolloState } from "@/jikopoint/lib/apolloConfig";
import { initializeStrapiApollo } from "@/jikopoint/lib/connector";
import ARTICLES_QUERY from "@/jikopoint/lib/queries/getArticles";

export default async function getArticles(limit = 10, start = 0) {
  const query = ARTICLES_QUERY;
  const apolloClient = initializeStrapiApollo();

  // Set revalidate length (seconds).
  const revalidate = 10;
  const response = {
    articles: null,
    error: false,
    errorMessage: null,
  };

  const variables = { start, limit };

  await apolloClient
    .query({ query, variables })
    .then(({ data }) => {
      if (!data) {
        response.error = true;
        response.errorMessage =
          "An error occurred while trying to retrieve articles";
        return null;
      }
      const { articles, categories } = data;
      response.articles = articles;
      response.categories = categories;

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
