/* istanbul ignore file */
import React from "react";
import { render } from "react-dom";
import { API } from "./api";

import { Comments } from "./comments/Comments";
import { useCommentsModel } from "./comments/useCommentsModel";
import { useCommentsViewModel } from "./comments/useCommentsViewModel";

function ViewComponent({ api }: { api: API }) {
  const commentsModel = useCommentsModel({
    api,
  });
  const commentsViewModel = useCommentsViewModel(commentsModel);
  return <Comments {...commentsViewModel} />;
}

render(
  <React.StrictMode>
    <ViewComponent
      api={{
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
      }}
    />
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
