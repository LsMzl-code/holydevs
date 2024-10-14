

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes ne nécessitant pas d'authentication
const isPublicRoute = createRouteMatcher([
   "/",
   "/connexion(.*)",
   "/inscription(.*)",
   "/annonce(.*)",
   "/aide(.*)",
]);

// Blocage des routes n'étant pas publiques
export default clerkMiddleware((auth, request) => {
   if (!isPublicRoute(request)) {
      auth().protect();
   }
});


export const config = {
   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};








