import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import "../styles/nprogress.css";
// import "../styles/sidebar.css";
import dynamic from "next/dynamic";
import HeadSEO from "@peersky/next-web3-chakra/dist/components/HeadSEO";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const AppContext = dynamic(() => import("../AppContext"), {
  ssr: false,
});
const DefaultLayout = dynamic(
  () => import("@peersky/next-web3-chakra/dist/layouts"),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

// import DefaultLayout from "@peersky/next-web3-chakra/layouts";
import { useRouter } from "next/router";
import NProgress from "nprogress";
// import { WHITE_LOGO_W_TEXT_URL } from "../src/constants";
const baseURL = "https://trir.xyz";
export default function CachingApp({ Component, pageProps }: any) {
  const [queryClient] = useState(new QueryClient());

  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname !== "/entry-point" &&
      window &&
      localStorage.getItem("entry_point")
    ) {
      localStorage.removeItem("entry_point");
    }
  }, [router]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactNode) => (
      <DefaultLayout
        selectorSchema="grey"
        metamaskSchema="grey"
        navbarBG="grey.900"
      >
        {page}
      </DefaultLayout>
    ));

  const headLinks = [
    // { rel: "preload", as: "image", href: WHITE_LOGO_W_TEXT_URL },
  ] as any;
  pageProps.preloads && headLinks.push(...pageProps.preloads);
  const defaultMetaTags = {
    title: "TriRatna - jewels of technology",
    keywords: "blockchain, services",
    description:
      "End to end product development and blockchain solutions",
    url: baseURL,
    image: baseURL + "/logo.png",
  };
  const metaTags = { ...defaultMetaTags, ...pageProps.metaTags };
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100% !important;
          width: 100%;
          overflow: hidden;
        }
      `}</style>
      <HeadSEO baseURL={baseURL} {...metaTags} />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppContext>{getLayout(<Component {...pageProps} />)}</AppContext>
      </QueryClientProvider>
    </>
  );
}
