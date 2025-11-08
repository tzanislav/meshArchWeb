# meshArchWeb — AI Contributor Notes

## System Overview
- Full-stack MERN site for mesharch.studio; Express API in `BackEnd/` serves React build from `FrontEnd/build`.
- SPA routing relies on the catch-all in `BackEnd/server.js`, so new backend routes must be registered before the wildcard.
- MongoDB models live under `BackEnd/models/` with timestamps; React pages/components live in `FrontEnd/src/Pages` and `FrontEnd/src/Components`.

## Backend Essentials
- Start locally with `cd BackEnd; npm install; node server.js`; set `.env` keys: `MONGO_DB`, `JWT_SECRET`, `AWS_REGION`, `S3_BUCKET_NAME`, `EMAILJS_PRIVATE_KEY`, optional `HTTP_PORT`, `DEV_MODE=development` to skip TLS cert loading.
- Auth endpoints in `BackEnd/routes/user.js` hash passwords via bcrypt; JWT secret is currently hard-coded ("secretkey"), so keep changes compatible unless rotating secrets everywhere.
- Portfolio CRUD flows live in `BackEnd/routes/vizProject.js`; image uploads hit `BackEnd/routes/upload.js` which streams to S3 and persists URLs on the `VizProject.urls` array.
- Blog management in `BackEnd/routes/blogs.js` expects multipart form-data, writes images to S3, and exposes an RSS feed at `/api/blog/rss` using the `rss` package.
- Auxiliary routes in `BackEnd/routes/api.js` surface `EMAILJS_PRIVATE_KEY` for the frontend; guard changes to avoid leaking secrets unintentionally.
- Regenerate the public sitemap by running `node BackEnd/sitemap.js`; it writes to `FrontEnd/public/sitemap.xml`.

## Frontend Patterns
- React app starts via `cd FrontEnd; npm install; npm start`; builds served statically in production.
- Shared axios instance in `FrontEnd/src/axios-config.js` switches baseURL on `REACT_APP_DEV_MODE`; some legacy components (`Login.js`, `Register.js`, `ProjectDetail.js`) call absolute production URLs, so update both base and hard-coded links when changing endpoints.
- Auth state comes from `AuthContext`; guard admin views by checking `authToken` (see `CreateProject.js`, `ProjectList.js`, `PostBlog.js`).
- Blog authoring reuses `BlogPostForm` for create/edit; it submits `FormData` and expects the backend to echo updated posts.
- Portfolio browsing uses `ProjectColumns` to fetch all projects, derive three columns, and pass image arrays into `ImageLightbox` for swipable galleries.

## Integration Notes
- Image uploads: admin creates projects through `POST /upload` (multipart 'images'), updates via `PUT /vizProject/:id`, and can reorder assets with `PUT /vizProject/:id/images/reorder`; ensure new UI respects these contracts.
- Blog deletion currently sends a bearer token but the backend does not validate it; if you add auth middleware, update `BlogPost.deletePost` to include the returned JWT.
- Rich blog content renders via `dangerouslySetInnerHTML` in `BlogArticle.js`; sanitize HTML before storing to avoid XSS.
- Contact form posts through EmailJS in `ContactForm.js` using hard-coded service/template IDs; adjust alongside any backend change to the mail key route.
- Frontend strings mix English and Bulgarian; preserve localization when editing copy.

## Deployment Considerations
- Production expects Express to proxy all API/static traffic at mesharch.studio; keep API paths relative so the build works behind the same origin.
- HTTPS cert paths in `BackEnd/server.js` point to LetsEncrypt on the host; leave them untouched unless you provision new certificates.
- S3 URLs are constructed manually (`https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/<key>`); maintain that format if moving buckets or regions.