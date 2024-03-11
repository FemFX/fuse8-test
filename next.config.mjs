/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  async exportPathMap(defaultPathMap) {
    return {
      "/": { page: "/" },
    };
  },
};

export default nextConfig;
