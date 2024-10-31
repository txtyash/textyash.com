export interface Post {
	id: number;
	slug: string;
	title: string;
	markdown: string;
	html: string;
	createdAt: string;
	updatedAt: string;
	readTime: number;
	visible: boolean;
	restricted: boolean;
	tags: string[];
}

export type EditorPost = Pick<Post, 'markdown' | 'visible' | 'visible' | 'restricted'> & {
	tags: string,
	error: string
};

export type PostSummary = Pick<Post, 'title' | 'slug' | 'readTime' | 'createdAt' | 'visible' | 'restricted'>;

export interface Tag {
	id: number;
	name: string;
}