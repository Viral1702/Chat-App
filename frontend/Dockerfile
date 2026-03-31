# stage 1
FROM node:20-alpine AS client-builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2
FROM nginx:alpine

# Copy your build files straight into Nginx's default public folder
COPY --from=client-builder /app/dist /usr/share/nginx/html

# Nginx runs on port 80 by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
