# stage 1
FROM node:20-alpine AS client-builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=client-builder /app/dist ./dist
COPY --from=client-builder /app/public ./public
COPY --from=client-builder /app/package*.json ./

RUN npm install -g serve

EXPOSE 3000

CMD ["npm", "start"]