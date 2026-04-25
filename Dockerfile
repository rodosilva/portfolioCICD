FROM node:24-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY public ./public
COPY src ./src
COPY index.html ./
COPY vite.config.js ./

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html/portfolio
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]