/** @type {import('next').NextConfig} */
const nextConfig = {
  async exportPathMap(defaultPathMap) {
    return {
      "/": { page: "/" },
    };
  },
};

export default nextConfig;
