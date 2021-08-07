// import cookie from 'cookie';

const sendVerificationRequest = async (email, csrfToken) => {
  // let Cookie;
  // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`).then(
  //   (res) => {
  //     const parsedCookie = cookie.parse(res.headers.get('set-cookie'));
  //     delete parsedCookie.Path;
  //     delete parsedCookie.SameSite;
  //     Cookie = Object.entries(parsedCookie)
  //       .map(([key, val]) => cookie.serialize(key, val))
  //       .join('; ')
  //     return res.json()
  //   }
  // )
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email,
      callbakUrl: `${process.env.NEXTAUTH_URL}`,
      redirect: "false",
      csrfToken,
      json: "true",
    }),
  };

  const result = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/signin/register`,
    fetchOptions
  ).then((res) => res.json());
  return result;
};

export default sendVerificationRequest;
