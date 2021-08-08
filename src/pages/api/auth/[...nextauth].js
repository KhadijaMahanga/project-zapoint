/* eslint-disable no-param-reassign */
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import loginUser from "@/jikopoint/utils/auth/loginUser";
import registerUser from "@/jikopoint/utils/auth/registerUser";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: process.env.SMTP_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Credentials({
      id: "login",
      name: "Login",
      async authorize(credentials) {
        // logic to look up the user from the credentials supplied
        try {
          const user = loginUser(credentials);
          if (!user?.isActive) {
            throw new Error(
              "Akaunti yako si kamilifu. Pitia kwenye barua pepe yako kuikamilisha"
            );
          }
          return user;
        } catch (e) {
          throw new Error(e);
        }
      },
    }),
    Providers.Credentials({
      id: "register",
      name: "Register",
      async authorize(credentials) {
        try {
          const user = await registerUser(credentials);
          if (user !== null) {
            return user;
          }
          throw new Error("Tafadhali jaribu tena");
        } catch (e) {
          throw new Error(e);
        }
      },
    }),
  ],
  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  redirect: false,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.JWT_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    encode: async ({ secret, token }) => jwt.sign(token, secret),
    decode: async ({ secret, token }) => jwt.verify(token, secret),
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth/jiunge", // Displays signin buttons
    // error: "/auth/ingia", // Error code passed in query string as ?error=
    verifyRequest: "/auth/kamilisha", // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
    async signIn(user, account, profile) {
      if (account.type === "oauth" || account.type === "email") {
        console.log(user);
        // save/ update user here
      }
      console.log("Sign in call back");
      console.log(user);
      console.log(account);
      console.log(profile);
      return true;
    },
    async session(session, token) {
      if (token?.user) {
        session.user = token.user;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.roles) {
        session.user.roles = token.roles;
      }
      return session;
    },
    async jwt(token, user, account) {
      if (typeof user !== typeof undefined) {
        token.auth_time = Number(new Date());
        token.user = user;
      }
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user?.roles) {
        token.roles = user.roles;
      }
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: "light",

  // Enable debug messages in the console if you are having problems
  debug: false,
});
