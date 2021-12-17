const relatedPostsFields = `
    relatedPosts {
        edges {
            node {
                title
                uri
                date
                featuredImage {
                    node {
                      altText
                      sourceUrl(size: MEDIUM)
                    }
                  }
    
            }
        }
    }
`;

export default relatedPostsFields;
