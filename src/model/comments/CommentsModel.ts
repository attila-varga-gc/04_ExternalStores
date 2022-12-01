import { createModel } from "../createModel";

export type CommentModel = {
  id: number;
  likes: number;
  message: string;
};

export type CommentsModelState = {
  comments: CommentModel[];
};

export type CommentsModel = CommentsModelState & {
  addLike: (id: number) => Promise<void>;
};

export const CommentsModel = createModel<CommentsModel>("CommentsModel");
