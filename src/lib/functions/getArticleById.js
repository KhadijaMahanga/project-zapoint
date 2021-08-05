import { addApolloState } from "@/jikopoint/lib/apolloConfig";
import { initializeStrapiApollo } from "@/jikopoint/lib/connector";
import ARTICLE_QUERY from "@/jikopoint/lib/queries/getArticleById";

export default async function getArticleById(id) {
  const query = ARTICLE_QUERY;
  const apolloClient = initializeStrapiApollo();

  // Set revalidate length (seconds).
  const revalidate = 60 * 3;
  const response = {
    article: null,
    error: false,
    errorMessage: null,
  };

  const variables = { id };

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
        articles: [article],
        headers,
      } = data;
      response.article = article;
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
      archive: false,
    },
    revalidate,
  });
}
