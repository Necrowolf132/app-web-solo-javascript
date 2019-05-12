FROM node:10.15.0-alpine
WORKDIR /app
COPY . /app
RUN npm install -g eslint standard 
# EXPOSE 3000
RUN adduser -D myuser
USER myuser
CMD ["npm", "run", "start"]