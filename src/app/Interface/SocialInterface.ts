export interface Post{
  Uid: string;
  CreationTime: string;
  CreationDate: string;
  Post: string;
  PostStatus: number;
  Reach: number;
  Reactions: number;
  CommentCounter: number;
  PostId: string;
  Status: string;
  ImagesUrl:[];
}

export interface Comment {
  Uid: string;
  LastUpdatedTime: string;
  LastUpdatedDate: string;
  Content: string;
  Status: string;
  PostId: string;
  ImagesUrl:[];
  PostStatus: number;
}