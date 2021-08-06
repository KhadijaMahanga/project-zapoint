import { initializeStrapiApollo } from "@/jikopoint/lib/connector";
import PATH_SLUG_QUERY from "@/jikopoint/lib/queries/getSlugs";

export default async function getArticlesPath() {
  const query = PATH_SLUG_QUERY;
  const apolloClient = initializeStrapiApollo();

  const variables = { start: 0, limit: 100 };

  const articles = await apolloClient.query({ query, variables });

  const paths = !articles?.data?.categories
    ? []
    : articles.data.categories.reduce((acc, val) => {
        acc.push({ params: { slug: [val.slug] } });
        val.articles.forEach((a) => {
          acc.push({ params: { slug: [val.slug, `${a.slug}-${a.id}`] } });
        });
        return acc;
      }, []);

  return { paths, fallback: "blocking" };
}
