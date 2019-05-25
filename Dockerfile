FROM necrowolf132/web-heroku-node-mongo:1.1
WORKDIR /opt
COPY . /opt
RUN '/iniciadormongo start'
RUN 'mongorestore --dir mongoData/ -u "root" -p "25448132" --authenticationDatabase admin'
RUN ["npm", "install"]

RUN ["npm", "run" ,"compilar"]
CMD ["npm", "run", "start"]