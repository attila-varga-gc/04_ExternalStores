import React from "react";
import { CommentsModel } from "../../model/comments/CommentsModel";
import { GlobalScopeContext } from "../../model/GlobalScope";
import { useModel } from "../../model/useModel";
import { Comments } from "./Comments";
import { useCommentsViewModel } from "./useCommentsViewModel";

export const CommentsView = React.memo(() => {
  const commentsModel = useModel(GlobalScopeContext, CommentsModel);
  const commentsViewModel = useCommentsViewModel(commentsModel);
  return (
    <>
      Comment count: {commentsModel.comments.length}
      <Comments
        comments={commentsViewModel.comments}
        like={commentsViewModel.like}
      />
    </>
  );
});

CommentsView.displayName = "CommentsView";
