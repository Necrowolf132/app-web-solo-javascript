FROM necrowolf132/app-web-javascript:1.0

WORKDIR /home/app-web-javascript-build

RUN rm -R * 

COPY . /home/app-web-javascript-build

RUN npm install

EXPOSE 80
EXPOSE 8080
EXPOSE 27017

ENTRYPOINT [ "/bin/bash" ]