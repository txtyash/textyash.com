import { writable } from 'svelte/store';
import type { PostSummary } from '$lib/types';

export const posts = writable(new Array<PostSummary>());
