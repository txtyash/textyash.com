import { writable, type Writable } from 'svelte/store';

export type B64 = string | null;

export const imageBlob: Writable<Blob | null> = writable(null);
// An image file's base64 string representation
export const imageB64: Writable<string | null> = writable(null);
// An image's file extension
export const imageExt: Writable<string | null> = writable(null);
