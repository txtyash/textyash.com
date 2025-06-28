<script lang="ts">
import { BlogList } from "$lib/components";
import { onMount } from "svelte";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const blogs: Blog[] = data.blogs;
</script>

<BlogList {blogs} />
