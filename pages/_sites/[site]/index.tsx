import type { GetStaticPaths, GetStaticProps } from "next";
import type { _SiteData, Meta } from "@/types";
import type { ParsedUrlQuery } from "querystring";

interface PathProps extends ParsedUrlQuery {
  site: string;
}

interface IndexProps {
  stringifiedData: string;
}

const Test = ({ stringifiedData }: any) => {
  return <div>this is the shop {stringifiedData}</div>;
};

export default Test;

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  const subdomains = [{}];
  const customDomains = [{}];

  const allPaths = [
    ...subdomains.map(({ subdomain }: any) => subdomain),
    ...customDomains.map(({ customDomain }: any) => customDomain),
  ].filter((path) => path) as Array<string>;
  console.log(allPaths);
  return {
    paths: allPaths.map((path) => ({
      params: {
        site: "asd",
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IndexProps, PathProps> = async ({
  params,
}) => {
  if (!params) throw new Error("No path parameters found");

  const { site } = params;
  console.log(site);

  let filter: {
    subdomain?: string;
    customDomain?: string;
  } = {
    subdomain: site,
  };

  if (site.includes(".")) {
    filter = {
      customDomain: site,
    };
  }

  // const data = null;
  const data = {
    name: "sohan",
  };

  if (!data) return { notFound: true, revalidate: 10 };

  return {
    props: {
      stringifiedData: JSON.stringify(data),
    },
    revalidate: 3600,
  };
};
