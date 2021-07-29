import React from "react";

import Hero from "@/jikopoint/components/Hero";
import Page from "@/jikopoint/components/Page";

export default function Index() {
  return (
    <Page>
      <Hero
        title="Jikoni"
        subtitle={["kupika pilau", "kuchoma chapati", "kukanda ngano"]}
        tagline="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula. Nullam augue augue, dignissim id bibendum id, consequat et leo. Curabitur viverra tincidunt nulla nec tempor nullam augue augue."
      />
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: { isConnected: true },
  };
}
