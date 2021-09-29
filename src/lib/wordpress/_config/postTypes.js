// Define valid WP post types (singular and plural GraphQL names).
export const postTypes = {
  page: {
    pluralName: "pages",
    route: "",
  },
  post: {
    pluralName: "posts",
    route: "jiko-news",
  },
};

// Define hierarchical post types.
export const hierarchicalPostTypes = ["page", "post"];
