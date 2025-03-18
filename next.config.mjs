// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Se desactiva la optimización de imagen de NextJS
        /* domains: [
            'www.highperformancecpmgate.com',
            'ads.servenobid.com'
        ], */
    },

    //basePath: "/",
    output: "export",
    reactStrictMode: true,
};

export default nextConfig;