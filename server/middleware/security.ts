import helmet from 'helmet';

export function setupSecurity(app) {
  // Set security headers
  app.use(helmet());
  
  // Disable X-Powered-By header
  app.disable('x-powered-by');
  
  // Add CORS pre-flight
  app.options('*');
  
  // Prevent clickjacking
  app.use(helmet.frameguard({ action: 'deny' }));
  
  // Content Security Policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.instagram.com"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
      },
    })
  );
}