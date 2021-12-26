import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import NewsCard from "@/jikopoint/components/NewsCard";
import Pagination from "@/jikopoint/components/Pagination";
import Section from "@/jikopoint/components/Section";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(40),
    },
  },
  section: {
    padding: `${typography.pxToRem(40)} 0`,
  },
  newsGrid: {
    marginBottom: typography.pxToRem(40),
    "&:last-of-type": {
      marginRight: 0,
    },
  },
  newsCard: {
    [breakpoints.up("md")]: {
      maxWidth: typography.pxToRem(290),
    },
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(385.3),
    },
  },
}));

function NewsList({ news, pageLimit, category, pagination }) {
  const classes = useStyles();

  // Track all news, including initial news and additionally loaded pages.
  const [allNews, setAllNews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [paginator, setPaginator] = useState(pagination);

  const endIndex = startIndex + pageLimit;

  const fetchMore =
    allNews.length - endIndex < pageLimit && paginator?.hasNextPage;
  const { data: moreNews } = useSWR(
    fetchMore ? ["/api/wp/archive", category, paginator?.endCursor] : null,
    (url, taxonomyId, cursor) =>
      fetcher(`${url}/?taxonomyId=${taxonomyId}&cursor=${cursor}`)
  );

  const handleNext = () => {
    if (fetchMore) {
      setAllNews([...allNews, ...(moreNews?.posts ?? [])]);
      const newPaginator = moreNews?.pagination;
      setPaginator(newPaginator);
    }
    setStartIndex(startIndex + pageLimit);
  };

  const handlePrevious = () => {
    setStartIndex(startIndex - pageLimit);
  };

  useEffect(() => {
    setAllNews(news);
  }, [news]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [startIndex]);

  if (!allNews?.length) {
    return null;
  }

  // for mobile devices
  const hasMore = endIndex < allNews.length;

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container>
          {allNews
            .slice(startIndex, endIndex)
            .map(({ featuredImage, excerpt, categories, slug, ...item }) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={slug}
                className={classes.newsGrid}
              >
                <NewsCard
                  {...item}
                  category={categories?.edges[0]?.node}
                  description={excerpt?.replace(/<[^>]+>/g, "") ?? ""}
                  slug={slug}
                  image={featuredImage?.node?.sourceUrl}
                  classes={{ root: classes.newsCard }}
                />
              </Grid>
            ))}
        </Grid>
        {(paginator?.hasNextPage || hasMore || startIndex !== 0) && (
          <Pagination
            next={paginator?.hasNextPage || hasMore ? handleNext : undefined}
            previous={startIndex !== 0 ? handlePrevious : undefined}
            classes={{ root: classes.pagination }}
          />
        )}
      </Section>
    </div>
  );
}

NewsList.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      featuredImage: PropTypes.shape({
        node: PropTypes.shape({
          sourceUrl: PropTypes.string,
        }),
      }),
    })
  ),
  pageLimit: PropTypes.number,
  pagination: PropTypes.shape({
    hasNextPage: PropTypes.bool,
  }),
  postType: PropTypes.string,
  category: PropTypes.string,
};

NewsList.defaultProps = {
  news: undefined,
  pageLimit: undefined,
  pagination: undefined,
  postType: undefined,
  category: "",
};

export default NewsList;
