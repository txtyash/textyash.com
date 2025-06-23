interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
}

interface Blog {
  metadata: BlogMetadata;
  content: any;
}
