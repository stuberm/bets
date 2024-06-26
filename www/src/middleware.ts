import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware((context, next) => {
  if (
    !/\/login\/?$/.test(context.url.pathname)
    && !/\/register\/?$/.test(context.url.pathname)
    && !/\/import\/?$/.test(context.url.pathname)
    && !(context.cookies.has('pbToken') && new URLSearchParams(context.cookies.get('pbToken')?.value).has("token"))
    && !context.request.headers.get('HX-Request')
  ) {
    return context.redirect('/login', 303)
  }
  return next()
});