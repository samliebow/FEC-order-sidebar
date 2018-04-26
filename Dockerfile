FROM node:9
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 1541
CMD ["npm", "run", "seedStart"]