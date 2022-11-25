/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
export interface Comment {
  Uid: string;
  LastUpdatedTime: string;
  LastUpdatedDate: string;
  Content: string;
  CommentStatus: number;
  Status: string;
  PostId: string;
  CommentId: string;
  ImagesUrl: string[];
  PostStatus: number;
}
export interface Post{
  Uid: string;
  CreationTime: string;
  CreationDate: string;
  LastUpdatedDate: string,
  LastUpdatedTime: string,
  LastUpdatedEpochTime: number,
  PostCreationEpochTime: number,
  Content: string;
  PostStatus: number;
  Reach: number;
  Reactions: number;
  CommentCounter: number;
  PostId: string;
  Status: string;
  ImagesUrl: string[];
  Comments: Comment[];
  Reactionss: Reaction[]; 
}

export interface SocialPageData{
  Uid: string;
  CreationTime: string;
  CreationDate: string;
  LastUpdatedDate: string;
  LastUpdatedTime: string;
  Content: string;
  LastUpdatedEpochTime: number;
  PostCreationEpochTime: number;
  Reach: number;
  Reactions: number;
  CommentCounter: number;
  PostId: string;
  Status: string;
  ImagesUrl: string[];
  Comments: Comment[];
  Reactionss: Reaction[]; 
}
export interface Reaction {
  Uid: string;
  CreationTime: string;
  CreationDate: string;
  Type: string;
  PostId: string;
}

export const defaultPost = {
  Uid: "",
  CreationTime: "",
  CreationDate: "",
  LastUpdatedDate: "",
  LastUpdatedTime: "",
  LastUpdatedEpochTime: null,
  PostCreationEpochTime: null,
  Content: "",
  PostStatus: null,
  Reach: null,
  Reactions: null,
  CommentCounter: null,
  PostId: "",
  Status: "",
  ImagesUrl: [],
  Comments: [],
  Reactionss: [],
}