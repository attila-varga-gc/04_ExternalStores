import * as Renderer from "react-test-renderer";
import { Comments } from "../Comments";
import { CommentsViewModel } from "../useCommentsViewModel";

it("should test against the snapshot", () => {
  const model = Mocked<CommentsViewModel>({
    comments: [
      {
        id: 42,
        message: "Test",
        likes: "12 likes",
      },
    ],
    like: jest.fn(),
  });
  expect(Renderer.create(<Comments {...model} />).toJSON()).toMatchSnapshot();
});

it("should test the click event", () => {
  const model = Mocked<CommentsViewModel>({
    comments: [{ id: 1 }],
    like: jest.fn(),
  });
  const tree = Renderer.create(<Comments {...model} />);
  tree.root.findByType("button").props.onClick();
  expect(model.like).toHaveBeenCalledTimes(1);
  expect(model.like).lastCalledWith(model.comments[0]);
});
