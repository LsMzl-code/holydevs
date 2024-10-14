import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
         {
            protocol: "https",
            hostname: "img.clerk.com",
         },
         {
            protocol: "https",
            hostname: "api.dicebear.com",
         },
      ],
      
   },
   
   
   experimental: {
      serverActions: {
         bodySizeLimit: "5mb",
      },
      
   },
};

export default withPWAInit({
   dest: "public",
   cacheOnFrontEndNav: true,
   aggressiveFrontEndNavCaching: true,
   reloadOnOnline: true,
   swcMinify: true,
   disable: process.env.NODE_ENV === "development",
   workboxOptions: {
      disableDevLogs: true,
   },
   
   
})(nextConfig);



// export default withPWA;
