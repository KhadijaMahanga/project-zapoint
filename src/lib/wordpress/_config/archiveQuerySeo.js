import queryPostsArchive from "@/jikopoint/lib/wordpress/posts/queryPostsArchive";

// Define SEO for archives.
const archiveQuerySeo = {
  post: {
    query: queryPostsArchive,
    title: "Jiko News",
    description: "",
  },
};

export default archiveQuerySeo;
