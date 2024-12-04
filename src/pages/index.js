import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageCards from "../components/HomepageCards"; // Adjust the import path as necessary

export default function Home() {
  console.log("this is loading!");
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <div className="container">
          <HomepageCards />
        </div>
      </main>
    </Layout>
  );
}
