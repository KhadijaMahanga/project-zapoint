import { NextSeo } from "next-seo";
import React from "react";

import Navigation from "@/jikopoint/components/Navigation";
import Footer from "@/jikopoint/components/Footer";

const menuItems = [
  {   label: "Darasa",
      href: "/darasa"
  },
  {   label: "Habari",
      href: "/habari"
  },
  {   label: "Kuhusu Sisi",
      href: "/kuhusu-sisi"
  },
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
function BasePage({ children, ...props}) {
  return (
    <>
      <Navigation social={social} menuItems={menuItems} />
      <NextSeo {...props} />
      {children}
      <Footer social={social} />
    </>
  );
}

export default BasePage;