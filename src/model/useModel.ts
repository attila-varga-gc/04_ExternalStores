import { useContext } from "react";

export function useModel<Scope, Return extends keyof Scope>(
  context: React.Context<Scope>,
  key: Return
) {
  const ctx = useContext(context);
  const value = ctx[key];
  return value as Return;
}
