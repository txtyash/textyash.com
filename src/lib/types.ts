import type { SQL } from "drizzle-orm";

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

export type NewPost = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'tags'> & {
	tags: number[]
};

export type UpdatedPost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'> & {
	updatedAt: SQL<any>
}

export type PostSummary = Pick<Post, 'title' | 'slug' | 'readTime' | 'createdAt' | 'visible' | 'restricted'>;

export type ReadPost = Pick<Post, 'slug' | 'html' | 'readTime' | 'createdAt' | 'updatedAt' | 'tags' | 'visible' | 'restricted'>