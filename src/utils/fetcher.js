const defaultOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const fetcher = async (url, options = defaultOptions) => {
  return fetch(url, options).then((response) => response.json());
};

export default fetcher;
