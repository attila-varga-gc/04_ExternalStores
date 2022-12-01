/* istanbul ignore file */

import React from "react";
import ReactDom from "react-dom/client";
import { GlobalScope } from "./model/GlobalScope";
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

root.render(
  <React.StrictMode>
    <GlobalScope api={api}>
      <CommentsView />
    </GlobalScope>
  </React.StrictMode>
);
