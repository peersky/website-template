import { SiteMap, SiteMapItemType } from "@peersky/next-web3-chakra/dist/types";

export const SITEMAP: SiteMap = [
    {
        title: "About",
        path: "/about",
        type: SiteMapItemType.CONTENT,
    },
];
const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
export const defaultMetaTags = {
    title: "",
    keywords: "",
    description: "",
    url: baseURL,
    image: baseURL + "/logo.png",
};
export const formLink: string = "";
export const COPYRIGHT_NAME: string = "";
export const ENABLE_WEB3: boolean = false;
