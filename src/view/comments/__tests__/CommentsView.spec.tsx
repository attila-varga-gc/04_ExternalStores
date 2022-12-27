import { ReactNode } from "react";
import * as Renderer from "react-test-renderer";
import { GlobalScopeContext } from "../../../model/GlobalScope";
import { CommentsView } from "../CommentsView";
import { CommentsModel } from "../../../model/comments/CommentsModel";
import { RxModel } from "../../../model/useModel";
import { createState } from "../../../model/useRxState";

const commentModelMock = Mocked<RxModel<CommentsModel>>({
  ...createState({
    comments: [
      {
        id: 1,
        likes: 1,
        message: "a",
      },
    ],
  }),
});

function Wrapper({ children }: { children: ReactNode }) {
  const value = {
    [CommentsModel]: commentModelMock,
  };
  return (
    <GlobalScopeContext.Provider value={value}>
      {children}
    </GlobalScopeContext.Provider>
  );
}

it("should test against the snapshot", () => {
  expect(
    Renderer.create(
      <Wrapper>
        <CommentsView />
      </Wrapper>
    ).toJSON()
  ).toMatchInlineSnapshot(`
    Array [
      "Comment count: ",
      "1",
      <div>
        <div>
          <div>
            a
          </div>
          <div>
            1 likes
          </div>
          <button
            onClick={[Function]}
            type="button"
          >
            Like
          </button>
        </div>
      </div>,
    ]
  `);
});
