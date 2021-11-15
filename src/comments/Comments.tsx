import { CommentsViewModel } from "./useCommentsViewModel";

export function Comments({ comments, like }: CommentsViewModel) {
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
}
