import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://formcraftai-delta.vercel.app',
      lastModified: new Date(),
    },
    {
      url: "https://formcraftai-delta.vercel.app/forms",
      lastModified: new Date(),
    },
    {
      url: "https://formcraftai-delta.vercel.app/privacy-policy",
      lastModified: new Date(),
    },
    {
        url: "https://formcraftai-delta.vercel.app/terms-of-service",
        lastModified: new Date()
    },
    {
        url: "https://formcraftai-delta.vercel.app/form-generation",
        lastModified: new Date()
    }
  ]
}