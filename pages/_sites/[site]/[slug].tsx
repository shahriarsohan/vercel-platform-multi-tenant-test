import remarkMdx from "remark-mdx";
import { MDXRemote } from "next-mdx-remote";
import { remark } from "remark";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";

import BlogCard from "@/components/BlogCard";
import BlurImage from "@/components/BlurImage";
import Date from "@/components/Date";
import Examples from "@/components/mdx/Examples";
import Layout from "@/components/sites/Layout";
import Loader from "@/components/sites/Loader";
import Tweet from "@/components/mdx/Tweet";

import type { AdjacentPost, Meta, _SiteSlugData } from "@/types";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ParsedUrlQuery } from "querystring";

interface PathProps extends ParsedUrlQuery {
  site: string;
  slug: string;
}

interface PostProps {
  stringifiedData: string;
  stringifiedAdjacentPosts: string;
  site: string;
}

export default function Post({
  stringifiedAdjacentPosts,
  stringifiedData,
  site,
}: PostProps) {
  const router = useRouter();
  if (router.isFallback) return <Loader />;
  console.log(stringifiedAdjacentPosts, stringifiedData, site);
  return <h2>hello {site}</h2>;
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  const posts = [
    {
      site: {
        subdomain: "new",
        customDomain: "",
      },
      slug: "test",
    },
  ];
  return {
    paths: posts.flatMap((post) => {
      if (post.site === null || post.site.subdomain === null) return [];

      if (post.site.customDomain) {
        return [
          {
            params: {
              site: post.site.customDomain,
              slug: post.slug,
            },
          },
          {
            params: {
              site: post.site.subdomain,
              slug: post.slug,
            },
          },
        ];
      } else {
        return {
          params: {
            site: post.site.subdomain,
            slug: post.slug,
          },
        };
      }
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostProps, PathProps> = async ({
  params,
}) => {
  if (!params) throw new Error("No path parameters found");

  const { site, slug } = params;

  console.log(site, slug);

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

  const data = {
    name: "asdasd",
  };

  const adjacentPosts = {
    asd: "asdd",
  };
  return {
    props: {
      stringifiedData: JSON.stringify({
        ...data,
      }),
      stringifiedAdjacentPosts: JSON.stringify(adjacentPosts),
      site,
    },
    revalidate: 3600,
  };
};
