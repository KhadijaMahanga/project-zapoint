import Page from "@/jikopoint/components/Page";
import React from "react";

export default function Index() {
  return (
    <Page>
      <div>HomePage</div>
    </Page>
  );
}

export async function getStaticProps(context) {
  return {
    props: { isConnected: true },
  };
}
