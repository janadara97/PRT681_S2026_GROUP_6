# Stage 1: install deps and produce a static production build (vite build).
# Same idea as the backend's two-stage build - node_modules and the
# build toolchain don't need to ship in the final image.
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# npm run build (below) runs `vite build`, whose default mode is
# "production" - that automatically loads .env.production, which hardcodes
# the real Azure backend URL for the actual Azure Static Web Apps deploy
# (which builds straight from source, not through this Dockerfile, so it's
# unaffected by anything here). But Vite gives an *actual* environment
# variable priority over .env file values, so declaring VITE_API_ROOT here
# overrides it just for this Docker build - defaulting to the local backend's
# host-mapped port, since docker-compose runs this same Dockerfile for local
# testing. ARG makes it a build-time value (not baked in until `npm run
# build` runs); ENV is what actually exposes it to that command.
ARG VITE_API_ROOT=http://localhost:5118/api
ENV VITE_API_ROOT=$VITE_API_ROOT

RUN npm run build

# Stage 2: serve the static dist/ output with nginx. React Router does
# client-side routing, so nginx.conf falls back unknown paths to
# index.html instead of 404ing (SPA fallback).
FROM nginx:alpine AS final
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
