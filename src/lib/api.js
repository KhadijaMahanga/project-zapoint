export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestURL = getStrapiURL(path);
  const response = await fetch(requestURL);
  const data = await response.json();
  return data;
}

export function getStrapiMedia(media) {
  const imageURL = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageURL;
}
