import { useCallback, useEffect } from "react";
import { API } from "../../api";
import { CommentsModelState, CommentsModel } from "./CommentsModel";
import { useRxState } from "../useRxState";
import { RxModel } from "../useModel";

export type CommentsModelProps = {
  api: API;
};

export function useCommentsModel({
  api,
}: CommentsModelProps): RxModel<CommentsModel, CommentsModelState> {
  const {
    getState: getModel,
    setState: setModel,
    $subject,
  } = useRxState<CommentsModelState>({
    comments: [],
  });
  useEffect(() => {
    async function fetch() {
      const comments = await api.fetchComments();
      setModel((model) => ({ ...model, comments }));
    }
    fetch();
  }, [api, setModel]);
  const addLike = useCallback(
    async (id: number) => {
      await api.addLike(id);
      const commentModel = getModel().comments.find(
        (comment) => comment.id === id
      );
      commentModel!.likes += 1;
      setModel((model) => ({ ...model, comments: [...model.comments] }));
    },
    [api, getModel, setModel]
  );
  return {
    $subject,
    addLike,
  };
}
