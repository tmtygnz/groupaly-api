export interface IRespQuote {
  _id: string;
  tags: string[];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface ISendQuote {
    content: string,
    author: string,
}