# Getting Started with Connapptivity CMS

1. Install firebase cli tools via `npm install -g firebase-tools` and login via `firebase login`.
2. Create a firebase project via the firebase console and make sure that Firestore, Storage, Functions and Hosting are enabled.
3. In ".firebaserc" specify the name of your firebase project.
4. Go to the "Functions" folder and install missing packages via `npm install` or `yarn install`.
5. Go back to the main folder and execute `firebase deploy` to deploy the specifications.
6. Go to the "admin" folder and fill out the missing .env variables (also in .env.production and .env.development).
7. Install missing packages via `npm install` or `yarn install`.
8. Start the dev server via `yarn start`.
9. If you want to deploy the cms execute `yarn build` in the admin folder and `firebase deploy --only hosting` in the main folder.