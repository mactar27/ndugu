# Cahier des Charges : Projet Ndugu

## 1. Présentation du Projet
**Ndugu** est une application web progressive (PWA) de gestion de listes de courses. L'objectif est d'offrir une expérience utilisateur fluide, rapide et fiable, même dans des conditions de connectivité limitée (ex: supermarchés, marchés couverts).

## 2. Objectifs Principaux
- **Simplicité** : Une interface intuitive sans friction pour ajouter et cocher des articles.
- **Mobilité** : Design "mobile-first" optimisé pour une utilisation à une main.
- **Fiabilité** : Accès offline complet et sauvegarde automatique des données.
- **Performance** : Temps de chargement quasi instantané grâce à Next.js Turbopack.

## 3. Spécifications Fonctionnelles

### 3.1 Gestion des Articles
- **Ajout rapide** : Champ de saisie avec bouton d'ajout immédiat.
- **Gestion des quantités** : Boutons `+` et `-` pour ajuster le nombre d'unités par article.
- **État d'achat** : Possibilité de cocher un article pour le marquer comme "acheté".
- **Tri intelligent** : Les articles à prendre sont affichés en haut de liste, les articles achetés sont déplacés vers le bas avec un style visuel distinct (barré).
- **Suppression** : 
    - Suppression individuelle d'un article.
    - Suppression groupée des articles achetés.
    - Réinitialisation complète de la liste.

### 3.2 Expérience Utilisateur (UX)
- **Compteur dynamique** : Affichage en temps réel du nombre d'articles restants dans le header.
- **Feedback visuel** : Animations lors de l'ajout, du cochage ou de la suppression.
- **Mode Offline** : L'application reste accessible sans connexion internet.

## 4. Spécifications Techniques

### 4.1 Stack Technologique
- **Framework** : Next.js 16 (App Router) avec Turbopack.
- **Langage** : TypeScript pour une robustesse accrue du code.
- **Style** : Tailwind CSS 4 (pour un design moderne et performant).
- **Composants** : Radix UI & Shadcn (primitives accessibles).
- **Icônes** : Lucide React.

### 4.2 Stockage et Persistance
- **Client-side Storage** : Utilisation du `LocalStorage` pour la persistance immédiate des données sans besoin de compte utilisateur.
- **PWA** : Intégration de `@ducanh2912/next-pwa` pour la mise en cache des assets et du HTML.

### 4.3 Architecture
- **Composants atomiques** : Séparation logique entre les éléments d'interface (UI) et la logique métier (`ShoppingList`).
- **Responsive Design** : Mise en page adaptative garantissant une expérience optimale du smartphone à la tablette.

## 5. Design et Identité Visuelle
- **Couleur Primaire** : Bleu (#3B82F6) symbolisant la confiance et la clarté.
- **Typographie** : Geist (moderne, lisible sur petits écrans).
- **Style** : "Sticker" design avec des bordures marquées (border-3) et des arrondis généreux (2xl) pour un aspect tactile et premium.

## 6. Évolutions Futures (Backlog)
- Partage de liste en temps réel entre plusieurs utilisateurs.
- Catégorisation automatique des produits (Légumes, Crémerie, etc.).
- Historique des achats et statistiques de dépenses.
- Reconnaissance vocale pour l'ajout d'articles.
