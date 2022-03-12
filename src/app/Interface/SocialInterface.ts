export interface Post{
  Uid: string;
  CreationTime: string;
  CreationDate: string;
  Post: string;
  Reach: number;
  Reactions: number;
  CommentCounter: number;
  PostId: string;
  Status: string;
}

export interface Comment {
  Uid: string;
  LastUpdatedTime: string;
  LastUpdatedDate: string;
  Content: string;
  Status: string;
  PostId: string;
}