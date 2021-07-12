import { NextSeo } from "next-seo";
import React from "react";

import Navigation from "@/jikopoint/components/Navigation";

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({ children, ...props}) {
  return (
    <>
      <Navigation />
      <NextSeo {...props} />
      {children}
    </>
  );
}

export default BasePage;