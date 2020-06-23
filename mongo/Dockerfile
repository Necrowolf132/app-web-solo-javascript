FROM mongo
WORKDIR /opt
ENV MONGO_INITDB_ROOT_USERNAME=root 
ENV  MONGO_INITDB_ROOT_PASSWORD=25448132
COPY mongoData /opt/mongoData
COPY mongod.conf /etc/mongod.conf
COPY mongorun.sh /docker-entrypoint-initdb.d
EXPOSE 27017/tcp
#CMD ["mongod","--config /etc/mongod.conf"]
#RUN mongod --config /etc/mongod.conf
#RUN chmod 777 mongorun.sh 
# RUN ./mongorun.sh
# CMD ["npm", "run" ,"compilar"]
#ENTRYPOINT [ "/bin/bash " ]
