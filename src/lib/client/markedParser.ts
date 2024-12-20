import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { markedEmoji } from 'marked-emoji';
import { Octokit } from '@octokit/rest';

export async function parse(markdown: string): Promise<string> {
	const octokit = new Octokit();
	const res = await octokit.rest.emojis.get();
	const emojis = res.data;
	const options = {
		emojis,
		// TODO: Fix the type of token
		renderer: (token: any) =>
			`<img alt="${token.name}" src="${token.emoji}" class="marked-emoji-img inline-block w-6 h-6">`
	};
	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);
	marked.use(markedEmoji(options));
	// intentional delay to ensure smooth loading with progressradial
	// await new Promise(resolve => setTimeout(resolve, 500));
	return marked.parse(markdown);
}
