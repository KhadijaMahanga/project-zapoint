import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import NewsNavigation from "@/jikopoint/components/Navigation/NewsNavigation";
import NewsCard from "@/jikopoint/components/NewsCard";
import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";
import getArticles from "@/jikopoint/lib/functions/getArticles";

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
function Index({ articles, categories }) {
  const classes = useStyles();
  return (
    <Page categories={categories}>
      <NewsNavigation categories={categories} />
      <Section classes={{ root: classes.section }}>
        <Grid container justifyContent="space-between">
          {articles.map((article) => (
            <Grid xs={12} md={6} lg={4} key={article.slug} item>
              <NewsCard
                {...article}
                classes={{ root: classes.card, category: classes.category }}
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Page>
  );
}

export async function getStaticProps() {
  const articleProps = await getArticles();
  return articleProps;
}

Index.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  articles: undefined,
  categories: undefined,
};

export default Index;
