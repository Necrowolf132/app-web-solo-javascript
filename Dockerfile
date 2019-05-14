FROM necrowolf132/web-heroku-node-mongo:1.1
WORKDIR /app
COPY . /app
RUN ["npm", "install"]
CMD ["npm", "run", "start"]