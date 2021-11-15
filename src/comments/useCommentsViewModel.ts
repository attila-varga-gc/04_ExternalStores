import { useState, useCallback, useEffect } from "react";
import { CommentsModel } from "./useCommentsModel";

export type CommentViewModel = {
  id: number;
  message: string;
  likes: string;
};

export type CommentsViewModelState = {
  comments: CommentViewModel[];
};

export type CommentsViewModel = CommentsViewModelState & {
  like: (comment: CommentViewModel) => Promise<void>;
};

export function useCommentsViewModel({
  comments,
  addLike,
}: CommentsModel): CommentsViewModel {
  const [viewModel, setViewModel] = useState<CommentsViewModelState>({
    comments: [],
  });
  useEffect(
    () =>
      setViewModel((viewModel) => ({
        ...viewModel,
        comments: comments.map(({ likes, ...comment }) => ({
          ...comment,
          likes: `${likes} likes`,
        })),
      })),
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
