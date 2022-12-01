/* istanbul ignore file */

import React, { ReactNode, useMemo } from "react";
import { API } from "../api";
import { CommentsModel } from "./comments/CommentsModel";
import { useCommentsModel } from "./comments/useCommentsModel";

type CommentsProvider = {
  [key: symbol]: unknown;
};

type CommentsProviderProps = {
  api: API;
  children: ReactNode;
};

export const GlobalScopeContext = React.createContext<CommentsProvider>({
  [CommentsModel]: undefined,
});

export function GlobalScope({ api, children }: CommentsProviderProps) {
  const comments = useCommentsModel({
    api,
  });
  const value = useMemo(
    () => ({
      [CommentsModel]: comments,
    }),
    [comments]
  );
  return (
    <GlobalScopeContext.Provider value={value}>
      {children}
    </GlobalScopeContext.Provider>
  );
}
