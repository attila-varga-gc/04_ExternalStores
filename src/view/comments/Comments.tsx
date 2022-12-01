import React from "react";
import { CommentViewModel } from "./useCommentsViewModel";

export type CommentsProps = {
  comments: CommentViewModel[];
  like: (comment: CommentViewModel) => Promise<void>;
};

export const Comments = React.memo(({ comments, like }: CommentsProps) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.message}</div>
          <div>{comment.likes}</div>
          <button type="button" onClick={() => like(comment)}>
            Like
          </button>
        </div>
      ))}
    </div>
  );
});

Comments.displayName = "Comments";
