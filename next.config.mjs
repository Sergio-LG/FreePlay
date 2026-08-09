const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.gamerpower.com" },
      { protocol: "https", hostname: "cdn1.epicgames.com" },
      { protocol: "https", hostname: "cdn2.epicgames.com" },
      { protocol: "https", hostname: "store-images.s-microsoft.com" },
    ],
  },
};

export default nextConfig;
