# textyash.com [WIP]

textyash.com is my personal blog site. You can view the deployment here <http://textyash.vercel.app>. The website is a work in progress. Please checkout the roadmap before making a PR/Issue.

## Tech Stack

* [Svelte](https://svelte.dev): It is technically a compiler that compiles the frontend code to spit out HTML, CSS & JS. It has no virtual DOM, thus being faster than frameworks like React & Angular.

* [Tailwind](https://tailwindcss.com): A CSS framework that heavily uses class names to stylize pages.

* [Skeleton UI](https://www.skeleton.dev): A UI framework that provides cool components. Based on Svelte & Tailwind.

* [Sveltekit](https://kit.svelte.dev): Sveltekit is a meta framework similar to NextJS. It provides routing & countless other features like SSR, CSR, SSG...

* [Supabase](https://supabase.com): It is a cloud database provider based on Postgres. It also provides authentication features.

* [Drizzle ORM](https://orm.drizzle.team): Fast ORM for querying the database. It is typesafe and uses typescript to declare schemas.

* [Vercel](https://vercel.com): Used to deploy the application with a minimal setup. 

* [Just](https://github.com/casey/just): Just is a local development tool. It is simply a command runner where you write your long & frequently used commands as recipes which you will be able to invoke using `just <recipe-name>`.

* [Direnv](https://github.com/direnv/direnv): Direnv is a part of the local development process where it helps to load necessary environment variables with ease.

* [Flakes](https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-develop): I use devshells with Nix flakes. It is yet another local development tool that creates sets up my development environment with all the necessary packages.

## Roadmap 

* [x] UI
* [x] User authentication
* [x] Blog post CRUD operations
* [x] ORM(drizzle) integration
* [x] Protected Routes
* [ ] Code Cleanup 1
  * [x] modularize code
  * [ ] Tailwind & styling
  * [ ] Typescript warnings
* [ ] Order posts by most recent
* [ ] User Session Invalidation
* [ ] Add footer:
  * [ ] Link page source code
* [ ] Delete Post confirmation dialog
* [ ] Add links to Mattermost & XMPP
* [ ] Replace formchecker with zod
* [ ] [Make back button robust](https://discord.com/channels/457912077277855764/1219289188445458483)
* [ ] Registration: Check if user is already registered
* [ ] Stylize supabase email templates
* [ ] Password Reset route
* [ ] Pagination
* [ ] Post filters
* [ ] Markdown editor
* [ ] Code Cleanup 2
* [ ] Implement RSS
* [ ] Page load animations
* [ ] Transitions
* [ ] Loading animations
* [ ] Tone generator route
* [ ] stuff.txt route: Fun stuff goes here ; )
  * [ ] Add user IP atop
  * [ ] Embed spotify playlists
  * [ ] Add picture gallery
  * [ ] Crash user's browser for fun
* [ ] Separate Vercel, Dev & Main Branches
* [ ] Code Cleanup 3
* [ ] Post cover image uploads using supabase
* [ ] User profile
  * [ ] Update email address
* [ ] User comments
* [ ] Code Cleanup 4
* [ ] Security Analysis
* [ ] DDOS protection
* [ ] Add Chat room
* [ ] Add Tests
* [ ] Custom domain
