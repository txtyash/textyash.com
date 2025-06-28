<script lang="ts">
import { BlogList } from "$lib/components";
import { onMount } from "svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const blogs: Blog[] = data.blogs;
// TODO: iterate through each word of the lyrics and highlight it with the accent color
const lyrics = [
  "A tornado flew around my room before you came",
  "Excuse the mess it made, it usually doesn't rain in",
  "Southern California, much like Arizona",
  "My eyes don't shed tears, but, boy, they pour when",
  "I'm thinkin' 'bout you, ooh, no, no, no",
  "I've been thinkin' 'bout you, you know, know, know",
  "I've been thinkin' 'bout you, do you think about me still?",
  "Do ya, do ya?",
  "Or do you not think so far ahead?",
  "'Cause I been thinkin' 'bout forever, ooh",
  "Or do you not think so far ahead?",
  "'Cause I been thinkin' 'bout forever, ooh",
  "No, I don't like you, I just thought you were cool enough to kick it",
  "Got a beach house I could sell you in Idaho",
  "Since you think I don't love you, I just thought you were cute",
  "That's why I kissed you",
  "Got a fighter jet, I don't get to fly it though",
  "I'm lying down",
  "Thinkin' 'bout you, ooh, no, no, no",
  "I've been thinkin' 'bout you, you know, know, know",
  "I've been thinkin' 'bout you, do you think about me still?",
  "Do ya, do ya?",
  "Or do you not think so far ahead?",
  "'Cause I been thinkin' 'bout forever, ooh",
  "Or do you not think so far ahead?",
  "'Cause I been thinkin' 'bout forever, ooh",
  "Yes, of course, I remember, how could I forget (How could I forget)",
  "How you feel? (How you feel?)",
  "You know you were my first time, a new feel",
  "It won't ever get old, not in my soul, not in my spirit, keep it alive",
  "We'll go down this road 'til it turns from color to black and white",
  "Or do you not think so far ahead?",
  "'Cause I been thinkin' 'bout forever, ooh",
  "Or do you not think so far ahead?",
  "'Cause I been thinkin' 'bout forever, ooh",
];

let line = $state("");
let currentIndex = 0;

onMount(() => {
  // Set initial line
  line = lyrics[0];

  // Create interval to cycle through lyrics
  const interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % lyrics.length;
    line = lyrics[currentIndex];
  }, 2000);

  // Cleanup function to clear interval when component is destroyed
  return () => {
    clearInterval(interval);
  };
});
</script>

<div class="flex items-center justify-between sm:justify-center gap-2 sm:gap-8 sm:gap-none">
  <!-- TODO: Link thinkin bout you song -->
  <a href="https://www.youtube.com/watch?v=6JHu3b-pbh8" target="_blank">
    <img
      alt="Yash Shinde"
      class="max-h-42 aspect-square object-cover rounded-full p-1 sm:p-3 sm:hover:p-5 border-5 border-indigo-500 dark:border-blue-500 rotate"
      src="/headphones.jpg"
    />
  </a>
  <p class="text-center w-100 text-xl sm:text-2xl text-wrap sm:text-start sm:text-3xl">
    {line}
  </p>
</div>

<div class="dark:bg-sky-500/40 bg-violet-500/40 h-1 rounded-xl m-6 sm:m-15">
</div>

<BlogList {blogs} isForHomePage="true" />

<style>
.rotate {
  animation: spin 6s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
