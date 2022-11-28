import { useMemo, useCallback } from "react";
import { CommentsModel } from "./useCommentsModel";

export type CommentViewModel = {
  id: number;
  message: string;
  likes: string;
};

export type CommentsViewModelCalculated = {
  comments: CommentViewModel[];
};

export type CommentsViewModel = CommentsViewModelCalculated & {
  like: (comment: CommentViewModel) => Promise<void>;
};

export function useCommentsViewModel({
  comments,
  addLike,
}: CommentsModel): CommentsViewModel {
  const viewModel = useMemo<CommentsViewModelCalculated>(
    () => ({
      comments: comments.map((comment) => ({
        ...comment,
        likes: `${comment.likes} likes`,
      })),
    }),
    [comments]
  );
  const like = useCallback(
    (commentViewModel: CommentViewModel) => {
      return addLike(commentViewModel.id);
    },
    [addLike]
  );
  return {
    ...viewModel,
    like,
  };
}
