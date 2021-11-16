import { renderHook, act } from "@testing-library/react-hooks";
import {
  CommentModel,
  CommentsModelProps,
  useCommentsModel,
} from "../useCommentsModel";

const comment = Mocked<CommentModel>({
  id: 42,
});

it("should test fetching", async () => {
  const props = Mocked<CommentsModelProps>({
    api: {
      fetchComments: () => [comment],
    },
  });
  const hook = renderHook(() => useCommentsModel(props));
  await hook.waitForNextUpdate();
  expect(hook.result.current.comments[0]).toEqual(comment);
});

it("should test addLike", async () => {
  comment.likes = 1;
  const props = Mocked<CommentsModelProps>({
    api: {
      fetchComments: () => [comment],
      addLike: jest.fn(),
    },
  });
  const hook = renderHook(() => useCommentsModel(props));
  await hook.waitForNextUpdate();
  await act(() => hook.result.current.addLike(comment.id));
  expect(props.api.addLike).toBeCalledTimes(1);
  expect(props.api.addLike).toBeCalledWith(comment.id);
  expect(comment.likes).toStrictEqual(2);
});
