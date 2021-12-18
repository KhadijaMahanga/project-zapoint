import { NextSeo } from "next-seo";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

import logo from "@/jikopoint/assets/logos/logo-jikopoint.jpg";
import Footer from "@/jikopoint/components/Footer";
import Navigation from "@/jikopoint/components/Navigation";

const footerItems = [
  { label: "Masharti na vigezo", href: "/masharti-na-vigezo" },
  { label: "Sera ya faragha", href: "/sera-ya-faragha" },
  { label: "Wasiliana Nasi", href: "/kuhusu-sisi" },
];

const menuItems = [
  { label: "Jiko Sokoni", href: "https://jikosokoni.co.tz" },
  { label: "Jiko Class", href: "/jiko-class/kozi" },
  { label: "Jiko News", href: "/jiko-news" },
  { label: "Kuhusu Sisi", href: "/kuhusu-sisi" },
];

const social = {
  facebook: "https://www.facebook.com/JikoPoint",
  instagram: "https://www.instagram.com/jiko_point",
  linkedin: "https://www.linkedin.com/company/jiko_point",
  twitter: "https://www.twitter.com/JikoPoint",
  youtube: "https://www.youtube.com/channel/UCXv2mpPGA6b22QbNaVC5YXQ",
};

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({ children, post, opengraphType, ...props }) {
  return (
    <>
      <Head>
        <script type="application/ld+json">{post?.seo?.schema?.raw}</script>
      </Head>
      <NextSeo
        {...post?.seo}
        title={post?.seo?.title ?? "JikoPoint"}
        description={
          post?.seo?.metaDesc ??
          "Jiko Point ni jukwaa maalum na la kipekee la mtandaoni linalomilikiwa na kampuni ya Nukta Africa na kuwezeshwa na Shirika la Hivos na washirika wake kwa lengo la kuchochea matumizi ya nishati safi Tanzania"
        }
        openGraph={{
          title: post?.seo?.title ?? "JikoPoint",
          description:
            post?.seo?.metaDesc ??
            "Jiko Point ni jukwaa maalum na la kipekee la mtandaoni linalomilikiwa na kampuni ya Nukta Africa na kuwezeshwa na Shirika la Hivos na washirika wake kwa lengo la kuchochea matumizi ya nishati safi Tanzania",
          images: [
            {
              url: post?.seo?.opengraphImage?.sourceUrl ?? logo.src,
              alt: post?.seo?.opengraphImage?.altText ?? post?.seo?.title,
            },
          ],
          url: post?.seo?.canonical ?? process.env.NEXT_PUBLIC_APP_URL,
          type: opengraphType ?? "article",
        }}
        nofollow={post?.seo?.metaRobotsNofollow !== "follow"}
        noindex={post?.seo?.metaRobotsNoindex !== "index"}
      />
      <Navigation
        social={social}
        menuItems={menuItems}
        footerItems={footerItems}
        {...props}
      />
      {children}
      <Footer social={social} footerItems={footerItems} />
    </>
  );
}

BasePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  opengraphType: PropTypes.string,
  post: PropTypes.shape({
    seo: PropTypes.shape({
      breadcrumbs: PropTypes.arrayOf(PropTypes.shape({})),
      canonical: PropTypes.string,
      description: PropTypes.string,
      metaRobotsNoindex: PropTypes.string,
      metaRobotsNofollow: PropTypes.string,
      metaDesc: PropTypes.string,
      opengraphModifiedTime: PropTypes.string,
      opengraphType: PropTypes.string,
      opengraphImage: PropTypes.shape({
        altText: PropTypes.string,
        sourceUrl: PropTypes.string,
      }),
      schema: PropTypes.shape({
        raw: PropTypes.string,
      }),
      siteTitle: PropTypes.string,
      siteDescription: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      social: PropTypes.shape({
        facebook: PropTypes.string,
        instagram: PropTypes.string,
        linkedIn: PropTypes.string,
        mySpace: PropTypes.string,
        pinterest: PropTypes.string,
        twitter: PropTypes.string,
        wikipedia: PropTypes.string,
        youTube: PropTypes.string,
      }),
    }),
  }),
};

BasePage.defaultProps = {
  children: undefined,
  opengraphType: undefined,
  post: {
    seo: {
      metaRobotsFollow: "follow",
      metaRobotsIndex: "index",
    },
  },
};

export default BasePage;
