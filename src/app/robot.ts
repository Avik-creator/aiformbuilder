import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots{
    const baseURL = "https://formcraftai-delta.vercel.app";
    return{
        rules:{
            userAgent: "*",
            allow: ["/"],
            disallow: [],
        },
        sitemap: `${baseURL}/sitemap.xml`
    }
}