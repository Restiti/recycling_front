# Étape 1: Construire l'application Angular
FROM node:21.2.0 

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install -g @angular/cli
RUN yarn install
CMD ["ng", "serve", "--host", "0.0.0.0"]
