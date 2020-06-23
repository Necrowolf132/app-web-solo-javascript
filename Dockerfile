FROM node:12

WORKDIR /app
COPY package*.json ./
COPY nodeinstall.sh ./
RUN ./nodeinstall.sh

# Or if you're using Yarn
# ADD package.json yarn.lock /app/
# RUN yarn install
#COPY /app/
ENV NODE_ENV=produccion
EXPOSE 8080
COPY . .
RUN ["npm", "run" ,"compilar"]
CMD ["npm", "run", "start"]