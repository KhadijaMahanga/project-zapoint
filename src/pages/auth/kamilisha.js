import { Typography } from "@material-ui/core";
import React from "react";

import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";

function Kamilisha() {
  return (
    <Page>
      <Section style={{ height: "100vh", padding: "50px" }}>
        <Typography variant="subtitle1">
          {`Ahsante kwa kujiandikisha, nenda kwenye kisanduku pokezi kukamilisha
          akaunti yako.`}
        </Typography>
      </Section>
    </Page>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Kamilisha;
