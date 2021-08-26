import PropTypes from "prop-types";
import React from "react";

import Hero from "@/jikopoint/components/Hero";
import HighlightCourses from "@/jikopoint/components/HighlightCourses";
import HighlightNews from "@/jikopoint/components/HighlightNews";
import NewsletterSubscription from "@/jikopoint/components/NewsletterSubscription";
import Page from "@/jikopoint/components/Page";
import getArticles from "@/jikopoint/lib/functions/getArticles";

function Index({ articles }) {
  return (
    <Page>
      <Hero
        ctaText="Kuwa Mkufunzi"
        href="/kuwa-mkufunzi"
        title="Jikoni"
        subtitle={["kupika pilau", "kuchoma chapati", "kukanda ngano"]}
        tagline="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula. Nullam augue augue, dignissim id bibendum id, consequat et leo. Curabitur viverra tincidunt nulla nec tempor nullam augue augue."
      />
      <HighlightNews
        items={articles}
        title="Jiko Habari"
        subtitle="Fuatilia Machapisho yetu "
      />
      <NewsletterSubscription />
      <HighlightCourses
        items={articles}
        title="Jiko Darasa"
        subtitle="Tujifunze Mapishi pamoje"
      />
    </Page>
  );
}

export async function getStaticProps() {
  const articleProps = await getArticles();

  return articleProps;
}

Index.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  articles: undefined,
};

export default Index;
