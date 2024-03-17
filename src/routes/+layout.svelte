<script>
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";

  // Highlight JS
  // import hljs from 'highlight.js/lib/core';
  // import 'highlight.js/styles/github-dark.css';
  // import { storeHighlightJs } from '@skeletonlabs/skeleton';
  // import xml from 'highlight.js/lib/languages/xml'; // for HTML
  // import css from 'highlight.js/lib/languages/css';
  // import javascript from 'highlight.js/lib/languages/javascript';
  // import typescript from 'highlight.js/lib/languages/typescript';

  // hljs.registerLanguage('xml', xml); // for HTML
  // hljs.registerLanguage('css', css);
  // hljs.registerLanguage('javascript', javascript);
  // hljs.registerLanguage('typescript', typescript);
  // storeHighlightJs.set(hljs);

  // Floating UI for Popups
  // import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  // import { storePopup } from '@skeletonlabs/skeleton';
  // storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
  <div
    class="mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 lg:max-w-screen-md"
  >
    <!-- Page Route Content -->
    <slot />
  </div>
</AppShell>
