import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cover images are local, hand-authored SVG placeholders/assets checked
    // into public/projects/**, so allowing SVG optimization is safe here.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
