import { useCallback } from "react";

const buttonState: { [key: string]: boolean } = {};

export function useFormButtonState(
  formName: string,
  open?: boolean
): [boolean, (val: boolean) => void] {
  const getState = useCallback(() => {
    return buttonState[formName] ?? false;
  }, [formName]);

  const setState = useCallback(
    (val: boolean) => {
      buttonState[formName] = val;
    },
    [formName]
  );

  return [getState(), setState];
}
