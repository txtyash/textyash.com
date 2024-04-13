export type Post = {
	id?: number;
	slug?: string;
	title?: string;
	content?: string;
	createdAt?: string;
	readTime?: number;
	hidden?: boolean;
	lastEdit?: string;
	exclusive?: boolean;
	imageUrl?: string | null;
};
