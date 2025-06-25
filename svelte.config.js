import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import targetBlank from "svelte-target-blank";

const mdsvexOptions = {
  extensions: [".md", ".svx"],
};

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions),
    targetBlank({ logLevel: "quiet", quietList: "/**/*.md" }),
  ],
  kit: { adapter: adapter() },
  extensions: [".svelte", ".md", ".svx"],
  vitePlugin: {
    inspector: {
      // change shortcut
      toggleKeyCombo: "alt-shift",
      // hold and release key to toggle inspector mode
      holdMode: true,
      // show or hide the inspector option
      showToggleButton: "always",
      // inspector position
      toggleButtonPos: "top-right",
    },
  },
};

export default config;
