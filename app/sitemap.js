const SITE_URL = "https://kelleyrandr.com";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly", 
      priority: 1.0,            
    },
  ];
}