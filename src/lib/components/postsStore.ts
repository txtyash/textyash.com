import { writable } from 'svelte/store';
import type { Post } from './types';

export const posts = writable(new Array<Post>());
