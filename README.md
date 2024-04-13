# textyash.com [WIP]

<https://textyash.com> is my personal blog site.

- The website is a work in progress.
- Contributions should only be made to the dev branch. Deployed here: <https://textyash.vercel.app>

## Tech Stack

- [Svelte](https://svelte.dev): It is technically a compiler that compiles the frontend code to spit out HTML, CSS & JS. It has no virtual DOM, thus being faster than frameworks like React & Angular.

- [Tailwind](https://tailwindcss.com): A CSS framework that heavily uses class names to stylize pages.

- [Skeleton UI](https://www.skeleton.dev): A UI framework that provides cool components. Based on Svelte & Tailwind.

- [Sveltekit](https://kit.svelte.dev): Sveltekit is a meta framework similar to NextJS. It provides routing & countless other features like SSR, CSR, SSG...

- [Supabase](https://supabase.com): It is a cloud database provider based on Postgres. It also provides authentication features.

- [Drizzle ORM](https://orm.drizzle.team): Fast ORM for querying the database. It is typesafe and uses typescript to declare schemas.

- [Vercel](https://vercel.com): Used to deploy the application with a minimal setup.

- [Just](https://github.com/casey/just): Just is a local development tool. It is simply a command runner where you write your long & frequently used commands as recipes which you will be able to invoke using `just <recipe-name>`.

- [Direnv](https://github.com/direnv/direnv): Direnv is a part of the local development process where it helps to load necessary environment variables with ease.

- [Flakes](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-develop): I use devshells with Nix flakes. It is yet another local development tool that creates sets up my development environment with all the necessary packages.
