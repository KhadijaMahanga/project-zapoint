import React from "react";

import Page from "@/jikopoint/components/Page";

export default function Index() {
  return (
    <Page>
      <div>HomePage</div>
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: { isConnected: true },
  };
}
