interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  published: boolean;
  readingTime: number | undefined;
}

interface Blog {
  metadata: BlogMetadata;
  content: any;
}
