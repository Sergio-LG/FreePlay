const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.gamerpower.com" },
      { protocol: "https", hostname: "**.epicgames.com" },
      { protocol: "https", hostname: "**.cloudflare.steamstatic.com" },
      { protocol: "https", hostname: "**.akamaihd.net" },
    ],
  },
};

export default nextConfig;
