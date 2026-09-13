# Stage 1: install deps and produce a static production build (vite build).
# Same idea as the backend's two-stage build - node_modules and the
# build toolchain don't need to ship in the final image.
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve the static dist/ output with nginx. React Router does
# client-side routing, so nginx.conf falls back unknown paths to
# index.html instead of 404ing (SPA fallback).
FROM nginx:alpine AS final
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
