---
title: Re-writing my Svelte blog without a database
description: Why I re-wrote textyash.com from scratch as a static website in Svelte 5 and dropped Supabase.
tags: ['webdev']
published: true
---

![Writing Fire GIF](/penguin-writing.gif)

## Old Setup

_This is not my first blog post. I wrote my first blog on this website during 2024. I'll import those blogs from Supabase soon._

The old version of [textyash.com](https://textyash.com) had a really good setup but it was an overkill for a simple blog. It had a custom markdown editor with markdown preview, authentication, a database, and blob storage for images. Checkout my old commits on <https://github.com/txtyash/textyash.com> for the old setup with Supabase.

## New Setup

The new setup obviously has a backend but all it does is serve static pages. The new website is built with [MdSvex](https://mdsvex.pngwn.io) & Tailwind for UI. No authentication, no database, no BS, just simple markdown. But there's a good reason why I had such a complex setup in the first place. It allowed me to write a blog from any computer or a phone with a browser. All I had to do was login to my account and start writing. With this new setup I can only write on my own machine with my git credentials. That's fine because I noticed I wasn't really writing much...

_The new design is inspired by [Puru's website](https://www.puruvj.dev)._

Cya!
