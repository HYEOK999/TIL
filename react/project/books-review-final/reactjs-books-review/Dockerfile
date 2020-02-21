FROM node:12.14.1-alpine 
LABEL maintainer="2woongjae@gmail.com" 

WORKDIR /build 

COPY . /build 

EXPOSE 5000 

RUN npm i serve -g 

ENTRYPOINT ["serve", "-s", "build"]