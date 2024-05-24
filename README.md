## Projet technique - QuoteTier 

### Description
Ce projet est une application web qui permet de consulter des citations, de les ajouter, de les modifier et de les supprimer.

### Technologies utilisées
- Frontend: ReactJS
- Backend: Symfony
- Base de données: MySQL
- Docker
- Git

### Installation

#### Prérequis
- Docker
- Docker-compose
- Git
- PHP 8
- Composer
- NodeJS
- Symfony CLI

#### Installation
1. Cloner le projet
```bash
git clone
```

2. Se déplacer dans le dossier du projet
```bash
cd QuoteTier
```

3. Installer les dépendances du backend
```bash
composer install
```

4. Installer les dépendances du frontend
```bash
npm install
```

5. Copier le fichier .env.example en .env.local
```bash
cp .env.example .env.local
```

6. Docker
```bash
docker-compose up -d
```

7. Créer les tables
```bash
symfony console d:migrations:migrate
```

8. Lancer le serveur
```bash
symfony serve
```

9. Lancer le serveur frontend
```bash
npm run dev-server
```

10. Accéder à l'application
```bash
http://localhost:8000
```


