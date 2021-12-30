import cookie from "cookie";

const sendVerificationRequest = async (email, status) => {
  let Cookie;
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/csrf`
  ).then((res) => {
    const parsedCookie = cookie.parse(res.headers.get("set-cookie"));
    delete parsedCookie.Path;
    delete parsedCookie.SameSite;
    Cookie = Object.entries(parsedCookie)
      .map(([key, val]) => cookie.serialize(key, val))
      .join("; ");
    return res.json();
  });

  const callbackUrl =
    status === "register"
      ? `${process.env.NEXTAUTH_URL}/auth/thibitishwa`
      : `${process.env.NEXTAUTH_URL}/auth/nywila/mpya?email=${email}`;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie,
    },
    body: new URLSearchParams({
      email,
      callbackUrl,
      redirect: "false",
      status,
      csrfToken: response.csrfToken,
      json: "true",
    }),
  };

  const result = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/signin/email`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });

  return result;
};

export default sendVerificationRequest;
