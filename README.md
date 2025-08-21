# PodcastWebapp

This project is a full-featured Podcast Web App built with **Angular** and powered by a **Laravel API**. It includes secure admin authentication, audio episodes, playlists, confessions submission, team member profiles, and modern theming with responsive design.
[Podcast deployment documentation](./Deployment.md)

---

## Technologies Used

- Angular 19.2.14
- Angular Material
- Laravel REST API (Backend)
- RxJS, HTTPClient, Angular Router
- HTML5 `<audio>` API
- Responsive CSS (Flex & Grid)
- Token-based Authentication (Bearer)
- PWA-ready structure (optional bonus)
- AWS amplify

---

## Features

### Authentication

- Secure admin login using bearer tokens.
- `AuthService`, `AuthGuard`, and `TokenInterceptor` implemented.
- Token stored securely in `localStorage`.

### Confessions

- `/confessions` for public anonymous message submission.
- Reactive Forms with validation.
- Admin view of all confessions at `/admin/confessions`.

### Episodes

- `/episodes` route displays all episodes with pagination.
- Latest 3–5 episodes on homepage.
- Persistent `<audio>` player across routes.
- Episode details at `/episodes/:id`.

### Playlists

- Admin can create/edit/delete playlists under `/admin/playlists`.
- Fields: title, description, and multi-episode selection (`MatSelect`).
- Public route `/playlists` for listing.
- Featured playlists on homepage.

### Team Members

- Admin form to create name, image, bio, and social links.
- CRUD at `/admin/team`.
- Public team cards under "Meet the Team" on homepage.

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
