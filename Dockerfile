# Étape 1: Build de l'application Angular
FROM node:lts-alpine AS build

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour optimiser le cache Docker
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copier tout le reste du projet
COPY . .

# Installer Angular CLI et builder l'application
RUN npm install -g @angular/cli && ng build --configuration production

# Vérification des fichiers générés après le build
RUN ls -l /app/dist/recycling

# Étape 2: Configuration de Nginx pour servir l'application Angular
FROM nginx:alpine

# Supprimer la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier la configuration personnalisée de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers Angular vers Nginx
COPY --from=build /app/dist/recycling/. /usr/share/nginx/html/

# Assurer que les fichiers appartiennent à l'utilisateur Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

# Vérifier les fichiers après la copie
RUN ls -l /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
