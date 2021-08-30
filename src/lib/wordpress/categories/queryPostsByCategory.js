import { gql } from "@apollo/client";

import categoriesPostFields from "@/jikopoint/lib/wordpress/_query-partials/categoriesPostFields";
import defaultPageData from "@/jikopoint/lib/wordpress/_query-partials/defaultPageData";
import seoPostFields from "@/jikopoint/lib/wordpress/_query-partials/seoPostFields";
import {
  archivePostFragment,
  archivePosts,
} from "@/jikopoint/lib/wordpress/posts/queryPostsArchive";

// Query: retrieve posts category archive.
const queryPostsByCategory = gql`
  query GET_POSTS_BY_CATEGORY(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderBy: PostObjectsConnectionOrderbyEnum = DATE
    $order: OrderEnum = DESC
    $imageSize: MediaItemSizeEnum = MEDIUM
    $id: ID!
    $idType: CategoryIdType = SLUG
  ) {
    ${categoriesPostFields}
    ${defaultPageData}
    homepageSettings {
      postsPage {
        blocksJSON
      }
    }
    category(id: $id, idType: $idType) {
      ${seoPostFields}
      ${archivePosts}
    }
  }
  ${archivePostFragment}
`;

export default queryPostsByCategory;
