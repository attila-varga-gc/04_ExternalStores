import { useMemo } from "react";
import { CommentsModel } from "../../model/comments/CommentsModel";

export type CommentViewModel = {
  id: number;
  message: string;
  likes: string;
};

export type CommentsViewModel = {
  comments: CommentViewModel[];
  like: (comment: CommentViewModel) => Promise<void>;
};

export function useCommentsViewModel({
  comments,
  addLike,
}: CommentsModel): CommentsViewModel {
  const viewModel = useMemo<CommentsViewModel>(
    () => ({
      comments: comments.map((comment) => ({
        ...comment,
        likes: `${comment.likes} likes`,
      })),
      like: (commentViewModel: CommentViewModel) => {
        return addLike(commentViewModel.id);
      },
    }),
    [comments, addLike]
  );
  return viewModel;
}
