
export default function robots() {
  return {
    rules: [
      {
        
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",         
          "/_next/*",        
          "/static/*",      
          "/*?*",           
        ],
      },
      {
        
        userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot"],
        allow: "/",
      },
      {
        
        userAgent: ["PerplexityBot", "OAI-SearchBot"], 
        allow: "/",
      },
      
    ],
    sitemap: [
  "https://kelleyrandr.com/sitemap.xml",
  "https://blog.kelleyrandr.com/sitemap_index.xml" 
]
  };
}