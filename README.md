# TrocSkillHub — Front-end

**TrocSkillHub**, une plateforme d'échange de compétences.
Application **React + TypeScript (Vite)** connectée à une API **Spring Boot** (dépôt séparé) via un cookie JWT.

**Fonctionnalités :** inscription, connexion/déconnexion, pages protégées, profil utilisateur.

## Stack

React 19 · TypeScript · Vite · React Router · React Hook Form · Vitest · Docker + Nginx · GitHub Actions

## Lancer le projet

**Prérequis :** Node.js 20+ et npm (Docker en option).

```bash
cd app_front-end
npm install
npm run dev        # http://localhost:5173
```

> ⚠️ Le front a besoin de l'API pour fonctionner. Vite n'a pas de proxy vers `/api` : pour tester l'application complète, utilisez Docker.

## Lancer avec Docker

```bash
docker network create trocskillhub-network   # une seule fois
# démarrer le back-end (service "app") sur ce réseau, puis :
docker compose up --build                    # http://localhost:8099
```

Nginx sert le front et redirige `/api/*` vers le back-end (`http://app:8080`).

## Scripts utiles

À lancer depuis `app_front-end/` :

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (`dist/`) |
| `npm run lint` | Analyse ESLint |
| `npm run test:ci` | Lance les tests une fois |

## Organisation du code

```
app_front-end/src/
├── pages/        # Authentification, profil
├── components/   # Header, formulaire, ProtectedRoute, sections du profil
├── context/      # AuthContext : état de connexion
├── hooks/        # useAuth, useUser
├── services/     # Appels API
└── testing/      # Tests Vitest
```

**Routes :** `/login` est publique. `/`, `/profile` et `/profile-2` exigent d'être connecté. Sinon, l'utilisateur est redirigé vers `/login`.

## CI

À chaque pull request, GitHub Actions exécute : installation → lint → build → tests.
