# Xon

Xon is designed to provide a platform for creating, managing, and studying digital flashcards.

## Description

Xon will enable users to create and organize flashcards, employ spaced repetition algorithms for effective learning, track their progress, and incorporate PDF Import and Import from Anki features.

## Table of Contents

- [Installation and Setup Instructions](#installation)
- [Folder Structure](#folder-structure)

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

**Installation:**

```bash
git clone <repository_url>
cd <project_directory>
yarn install
```

**To Start Server:**
```
yarn run dev
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Folder Structure

```
├── public
│   ├── vite.svg
│   ├── xon-logo.png
│   └── xon-logo.svg
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── images
│   │   │   └── xon-logo.png
│   │   ├── react.svg
│   │   └── svgs
│   │       ├── CheckmarkIcon.tsx
│   │       ├── HideEye.tsx
│   │       ├── index.ts
│   │       ├── OpenEye.tsx
│   │       └── RadioButtonIcon.tsx
│   ├── common
│   │   ├── components
│   │   │   ├── Button.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── index.ts
│   │   │   ├── Input.tsx
│   │   │   └── RadioButton.tsx
│   │   └── hooks
│   │       └── index.ts
│   ├── index.css
│   ├── layouts
│   │   └── index.ts
│   ├── main.tsx
│   ├── routes
│   │   ├── index.ts
│   │   ├── Routes.ts
│   │   └── Routing.tsx
│   ├── services
│   │   ├── apiClient.ts
│   │   ├── apiEndPoint.ts
│   │   ├── index.ts
│   │   ├── networkRequestService.ts
│   │   └── useSetupAxios.ts
│   ├── utils
│   │   ├── constant.ts
│   │   ├── index.ts
│   │   └── messages.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── yarn.lock
├── README.md
├── package.json
└── postcss.config.js
```
