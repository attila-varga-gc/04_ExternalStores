import { renderHook } from "@testing-library/react-hooks";
import { skip } from "rxjs";
import { CommentModel } from "../CommentsModel";
import { useCommentsModel, CommentsModelProps } from "../useCommentsModel";

const comment = Mocked<CommentModel>({
  id: 42,
});

it("should test fetching comments from the API", (done) => {
  const props = Mocked<CommentsModelProps>({
    api: {
      fetchComments: async () => [comment],
    },
  });
  const {
    result: {
      current: { $subject },
    },
  } = renderHook(() => useCommentsModel(props));
  $subject.pipe(skip(1)).subscribe((res) => {
    expect(res.comments).toEqual([comment]);
    done();
  });
});

it("should test addLike", (done) => {
  comment.likes = 1;
  const props = Mocked<CommentsModelProps>({
    api: {
      fetchComments: () => [comment],
      addLike: jest.fn(),
    },
  });
  const {
    result: {
      current: { $subject, addLike },
    },
  } = renderHook(() => useCommentsModel(props));
  addLike(comment.id);
  $subject.pipe(skip(1)).subscribe(() => {
    expect(props.api.addLike).toBeCalledTimes(1);
    expect(props.api.addLike).toBeCalledWith(comment.id);
    expect(comment.likes).toStrictEqual(2);
    done();
  });
});
