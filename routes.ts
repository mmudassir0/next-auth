// route that don't require auth will define here
/**
 * these route don't require auth
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * these route that are use for auth
 * it will redirect to /setting page
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];
/**
 * route that is used prefix for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/setting";
