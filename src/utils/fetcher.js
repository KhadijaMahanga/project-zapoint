const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "User-Agent": "*",
  },
};

const fetcher = async (url, options = defaultOptions) => {
  return fetch(url, options).then((response) => response.json());
};

export default fetcher;
