FROM node:18-alpine 

WORKDIR /app

COPY package*.json /app/

RUN npm install -g pnpm

RUN pnpm install 

COPY . /app/

# Clean up unnecessary files to reduce image size
RUN pnpm prune --prod

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
