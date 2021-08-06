import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import NewsNavigation from "@/jikopoint/components/Navigation/NewsNavigation";
import NewsCard from "@/jikopoint/components/NewsCard";
import NewsContent from "@/jikopoint/components/NewsContent";
import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";
import getArticleById from "@/jikopoint/lib/functions/getArticleById";
import getCategoryArticles from "@/jikopoint/lib/functions/getCategoryArticles";
import getArticlesPath from "@/jikopoint/lib/functions/getSlugs";

const useStyles = makeStyles(({ typography }) => ({
  section: {
    padding: `${typography.pxToRem(40)} 0`,
  },
  card: {
    marginBottom: typography.pxToRem(20),
    width: "100%",
  },
  category: {
    display: "none",
  },
}));

function Index({
  article,
  articles,
  headers,
  archive,
  activeCategory,
  ...props
}) {
  const classes = useStyles();
  return (
    <Page categories={headers} active={activeCategory} {...props}>
      <NewsNavigation categories={headers} active={activeCategory} />
      {archive ? (
        <Section classes={{ root: classes.section }}>
          <Grid container>
            {articles?.length &&
              articles?.map((art) => (
                <Grid xs={12} md={6} lg={4} key={art.slug} item>
                  <NewsCard
                    {...art}
                    classes={{ root: classes.card, category: classes.category }}
                  />
                </Grid>
              ))}
          </Grid>
        </Section>
      ) : (
        <NewsContent {...article} />
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  return getArticlesPath();
}

export async function getStaticProps({ params: { slug } }) {
  const activeCategory = slug[0];
  let res = null;

  if (slug?.length > 1) {
    const articleArr = slug[1].split("-");
    const articleId = articleArr[articleArr.length - 1];
    res = await getArticleById(articleId);
  } else {
    res = await getCategoryArticles(activeCategory);
  }

  if (res?.props?.error) {
    return {
      notFound: true,
    };
  }

  return {
    ...res,
    props: {
      ...res.props,
      activeCategory,
    },
  };
}

Index.propTypes = {
  article: PropTypes.shape({}),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
    })
  ),
  headers: PropTypes.arrayOf(PropTypes.shape({})),
  archive: PropTypes.bool,
  activeCategory: PropTypes.string,
};

Index.defaultProps = {
  article: undefined,
  articles: undefined,
  headers: undefined,
  archive: undefined,
  activeCategory: undefined,
};

export default Index;
