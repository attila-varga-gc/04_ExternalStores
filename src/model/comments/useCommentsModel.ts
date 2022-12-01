import { useState, useCallback, useEffect } from "react";
import { API } from "../../api";
import { CommentsModelState, CommentsModel } from "./CommentsModel";

export type CommentsModelProps = {
  api: API;
};
export function useCommentsModel({ api }: CommentsModelProps): CommentsModel {
  const [model, setModel] = useState<CommentsModelState>({
    comments: [],
  });
  useEffect(() => {
    async function fetch() {
      const comments = await api.fetchComments();
      setModel((model) => ({ ...model, comments }));
    }
    fetch();
  }, [api]);
  const addLike = useCallback(
    async (id: number) => {
      await api.addLike(id);
      const commentModel = model.comments.find((comment) => comment.id === id);
      commentModel!.likes += 1;
      setModel((model) => ({
        ...model,
        comments: [...model.comments],
      }));
    },
    [model, api]
  );
  return {
    ...model,
    addLike,
  };
}
