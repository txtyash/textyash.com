import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx'],
	vitePlugin: {
		experimental: {
			inspector: {
				// change shortcut
				toggleKeyCombo: 'alt-shift',
				// hold and release key to toggle inspector mode
				holdMode: true,
				// show or hide the inspector option
				showToggleButton: 'always',
				// inspector position
				toggleButtonPos: 'top-right'
			}
		}
	}
};

export default config;
