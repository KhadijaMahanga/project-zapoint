import { NextSeo } from "next-seo";
import React from "react";

import Footer from "@/jikopoint/components/Footer";
import Navigation from "@/jikopoint/components/Navigation";

const footerItems = [
  { label: "Masharti na vigezo", href: "/masharti-na-vigezo" },
  { label: "Sera ya faragha", href: "/sera-ya-faragha" },
  { label: "Wasiliana Nasi", href: "/kuhusu-sisi" },
];

const menuItems = [
  { label: "Darasa", href: "/darasa" },
  { label: "Habari", href: "/habari" },
  { label: "Kuhusu Sisi", href: "/kuhusu-sisi" },
];

const social = {
  facebook: "facebook.com",
  instagram: "instagram.com",
  linkedin: "linkedin.com",
  twitter: "twitter.com",
  youtube: "youtube.com",
};

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({ children, ...props }) {
  return (
    <>
      <Navigation
        social={social}
        menuItems={menuItems}
        footerItems={footerItems}
      />
      <NextSeo {...props} />
      {children}
      <Footer social={social} footerItems={footerItems} />
    </>
  );
}

export default BasePage;
