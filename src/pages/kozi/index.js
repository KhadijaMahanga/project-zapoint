import PropTypes from "prop-types";
import React from "react";

import Page from "@/jikopoint/components/Page";

function Index({ course }) {
  return <Page course={course} />;
}

export async function getServerSideProps() {
  const course = {};

  return {
    props: {
      course,
    },
  };
}

Index.propTypes = {
  course: PropTypes.shape({}),
};

Index.defaultProps = {
  course: undefined,
};

export default Index;
