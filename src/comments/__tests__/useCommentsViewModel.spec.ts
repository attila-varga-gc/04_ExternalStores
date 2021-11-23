import { renderHook, act } from "@testing-library/react-hooks";
import { CommentModel, CommentsModel } from "../useCommentsModel";
import { useCommentsViewModel } from "../useCommentsViewModel";

const comment: CommentModel = {
  id: 42,
  likes: 42,
  message: "42",
};

it("should convert the comment into UI presentable parts", async () => {
  const model = Mocked<CommentsModel>({
    comments: [comment],
  });
  const hook = renderHook(() => useCommentsViewModel(model));
  expect(hook.result.current.comments[0]).toMatchInlineSnapshot(`
    Object {
      "id": 42,
      "likes": "42 likes",
      "message": "42",
    }
  `);
});

it("should add a single like to the right comment", async () => {
  const model = Mocked<CommentsModel>({
    comments: [comment],
    addLike: jest.fn(),
  });
  const hook = renderHook(() => useCommentsViewModel(model));
  act(() => hook.result.current.like(hook.result.current.comments[0]));
  expect(model.addLike).toBeCalledTimes(1);
  expect(model.addLike).toBeCalledWith(comment.id);
});
