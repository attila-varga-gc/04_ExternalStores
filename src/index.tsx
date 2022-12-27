/* istanbul ignore file */

import React, { useContext, useRef } from "react";
import ReactDom from "react-dom/client";
import { GlobalScope, GlobalScopeContext } from "./model/GlobalScope";
import { CommentsView } from "./view/comments/CommentsView";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);

const api = {
  fetchComments: async () => [
    {
      id: 0,
      message: "Lorem ipsum",
      likes: 2,
    },
    {
      id: 1,
      message: "Dolor sit amet",
      likes: 3,
    },
  ],
  addLike: async () => void 0,
};

function RenderCount() {
  useContext(GlobalScopeContext);
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log("render");
  return (
    <>
      Render Count: {renderCount.current}
      <br />
    </>
  );
}

root.render(
  <React.StrictMode>
    <GlobalScope api={api}>
      <RenderCount />
      <CommentsView />
    </GlobalScope>
  </React.StrictMode>
);
