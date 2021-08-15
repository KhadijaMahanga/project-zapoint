import PropTypes from "prop-types";
import React from "react";

import AdminPage from "@/jikopoint/components/AdminPage";
import Page from "@/jikopoint/components/Page";
import fetcher from "@/jikopoint/utils/fetcher";

function Admin(props) {
  return (
    <Page>
      <AdminPage {...props} />
    </Page>
  );
}

export async function getStaticProps() {
  const roles = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/roles`);

  return {
    props: {
      roles,
    },
  };
}

Admin.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({})),
};

Admin.defaultProps = {
  roles: undefined,
};

export default Admin;
