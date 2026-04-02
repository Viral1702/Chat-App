# Stage 1
FROM node:20-alpine AS client-builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM node:20-alpine

WORKDIR /app

COPY --from=client-builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
