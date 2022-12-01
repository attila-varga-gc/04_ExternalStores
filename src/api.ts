import { CommentModel } from "./model/comments/CommentsModel";

export type API = {
  fetchComments: () => Promise<CommentModel[]>;
  addLike: (id: number) => Promise<void>;
};
