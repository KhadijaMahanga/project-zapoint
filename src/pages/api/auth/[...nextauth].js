/* eslint-disable no-param-reassign */
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import loginUser from "@/jikopoint/utils/auth/loginUser";
import clientPromise from "@/jikopoint/utils/mongodb";
import customEmailVerificationRequest from "@/jikopoint/utils/next-auth/customEmailSendVerification";

export default async (req, res) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      EmailProvider({
        server: process.env.SMTP_SERVER,
        from: process.env.EMAIL_FROM,
        sendVerificationRequest: async ({
          identifier,
          url,
          baseUrl,
          token,
          provider,
        }) => {
          const callbackUrl = req?.body?.callbackUrl ?? "";
          const status = req?.body?.status ?? "";
          return customEmailVerificationRequest({
            identifier,
            url,
            baseUrl,
            token,
            provider,
            callbackUrl,
            status,
          });
        },
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
      }),
      CredentialsProvider({
        id: "login",
        name: "Login",
        async authorize(credentials) {
          // logic to look up the user from the credentials supplied
          try {
            const user = await loginUser(credentials);
            if (user?.isDeleted) {
              throw new Error(
                "Akaunti hii imefutwa, tafadhali jiandikishe tena"
              );
            }
            if (!user?.emailVerified) {
              throw new Error(
                "Akaunti hii si kamilifu. Pitia kwenye barua pepe yako kuikamilisha"
              );
            }
            return user;
          } catch (e) {
            throw new Error(e);
          }
        },
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    // A database is optional, but required to persist accounts in a database
    database: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    redirect: false,
    session: {
      strategy: "jwt",
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
      error: "/auth/error", // Error code passed in query string as ?error=
      // verifyRequest: "/auth/kamilisha", // Used for check email page
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
      async signIn({ user }) {
        if (user?.isDeleted) {
          return false;
        }
        return true;
      },
      async session({ session, token }) {
        if (token?.accessToken) {
          session.accessToken = token.accessToken;
        }
        if (token?.role) {
          session.user.role = token.role;
        }
        return session;
      },
      async jwt({ token, user, account }) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
        if (user?.role) {
          token.role = user.role;
        }
        if (!token?.role) {
          token.role = "trainee";
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
    debug: true,
  });
