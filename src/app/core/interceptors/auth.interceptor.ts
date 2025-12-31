import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor to add authentication headers to outgoing HTTP requests.
 * Currently a placeholder for future implementation of token attachment.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Add auth token logic here when needed
  return next(req);
};
