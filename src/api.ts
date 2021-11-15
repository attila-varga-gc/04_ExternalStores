import { CommentModel } from "./comments/useCommentsModel";

export type API = {
  fetchComments: () => Promise<CommentModel[]>;
  addLike: (id: number) => Promise<void>;
};
