import { useRef, useCallback } from "react";
import { BehaviorSubject } from "rxjs";

export const createState = <T>(initialValue: T) => ({
  $subject: new BehaviorSubject<T>(initialValue),
});

export function useRxState<T>(initialValue: T): {
  getState: () => T;
  setState: (nextFn: (prev: T) => T) => void;
  $subject: BehaviorSubject<T>;
} {
  const subject = useRef(createState(initialValue).$subject);
  const setState = useCallback(
    (nextFn: (prev: T) => T) =>
      subject.current.next(nextFn(subject.current.value)),
    []
  );
  return {
    getState: () => subject.current.value,
    setState,
    $subject: subject.current,
  };
}
