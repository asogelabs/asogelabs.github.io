// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Se desactiva la optimización de imagen de NextJS
    },

    basePath: "/",
    output: "export",
    reactStrictMode: true,
};

export default nextConfig;