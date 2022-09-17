import Loader from "@/components/sites/Loader";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
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
  return <h2>hello {site} this is shop area</h2>;
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
