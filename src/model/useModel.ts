import { useContext, useMemo, useSyncExternalStore } from "react";
import { BehaviorSubject } from "rxjs";

export type RxModel<Model, State = {}> = {
  $subject: BehaviorSubject<State>;
} & Omit<Model, keyof State>;

export function useModel<Scope, Return extends keyof Scope>(
  context: React.Context<Scope>,
  key: Return
) {
  const ctx = useContext(context);
  const value = ctx[key] as RxModel<Return, Return>;
  const $subject = value.$subject;
  const [subscribe, getServerSnapshot] = useMemo(() => {
    /* istanbul ignore next */
    const subscribe = (onStoreChange: () => void) => {
      const subscription = $subject.subscribe(onStoreChange);
      return subscription.unsubscribe.bind(subscription);
    };
    return [subscribe, () => $subject.value];
  }, [$subject]);
  const state = useSyncExternalStore(subscribe, getServerSnapshot);
  Object.assign(state, value);
  return state;
}
