const sendVerificationRequest = async (email, csrfToken) => {
  try {
    const verification = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/signin/email`,
      {
        method: "POST",
        body: JSON.stringify({
          csrfToken,
          email,
        }),
      }
    );
    if (!verification) return new Error("error verifying");
    // return Promise.reject(
    //   "/auth/credentials-signin?error=error sending verification"
    // );

    return verification;
  } catch (e) {
    return e;
  }
};

export default sendVerificationRequest;
