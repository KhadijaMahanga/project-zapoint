import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
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
  facebook: "https://www.facebook.com",
  instagram: "https://www.instagram.com",
  linkedin: "https://www.linkedin.com",
  twitter: "https://www.twitter.com",
  youtube: "https://www.youtube.com",
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
        {...props}
      />
      <NextSeo {...props} />
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
};

BasePage.defaultProps = {
  children: undefined,
};

export default BasePage;
