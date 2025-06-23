<script lang="ts">
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

<div class="flex items-center justify-around gap-2 sm:gap-none">
  <!-- TODO: Link thinkin bout you song -->
  <a href="https://www.youtube.com/watch?v=6JHu3b-pbh8" target="_blank">
    <img
      alt="Yash Shinde"
      class="max-h-42 aspect-square object-cover rounded-full p-1 sm:p-3 sm:hover:p-5 border-5 border-indigo-500 dark:border-green-600 rotate"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7L8PAK1JdE5jAVqzQUn42fkvChpfLG_nD-w&s"
    />
  </a>
  <p class="text-center w-100 text-lg sm:text-2xl text-wrap sm:text-start sm:text-3xl">
    {line}
  </p>
</div>

<div class="dark:bg-teal-500/40 pulse bg-violet-500/40 h-1 rounded-xl m-6 sm:m-15">
</div>

{#each blogs as blog}
  <div class="w-full my-3 sm:my-6 p-2 sm:p-4 rounded-2xl bg-violet-500/5 dark:bg-teal-500/3 border-b-8 border-teal-500/0 hover:dark:border-teal-500/7 hover:border-violet-500/20">
    <a href="blog/{blog.slug}">
      <p class="text-violet-500 dark:text-teal-500 font-semibold text-xl sm:text-3xl">
        {blog.title}
      </p>
      <p class="text-md sm:text-lg font-normal">{blog.description}</p>
      <p class="text-right text-violet-500 dark:text-teal-500 font-semibold text-sm sm:text-xl">
        {blog.date}
      </p>
    </a>
  </div>
{/each}

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
