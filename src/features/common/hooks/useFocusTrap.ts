import { MutableRefObject, useEffect } from "react";
import { Keyboard } from "../lib/constants";

type UseFocusTrapOptions = {
  elementRef: MutableRefObject<HTMLElement | null>;
};

const focusableSelectors = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "[tabindex]",
  "[contentEditable=true]",
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(",");

export function useFocusTrap({ elementRef }: UseFocusTrapOptions) {
  useEffect(() => {
    if (!elementRef.current) return;

    const firstFocusableElement = elementRef.current.querySelectorAll(
      focusableSelectors
    )[0] as HTMLElement;
    firstFocusableElement.focus();
  }, [elementRef]);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === Keyboard.Tab) {
        if (!elementRef.current) return;

        const focusableElements =
          elementRef.current.querySelectorAll(focusableSelectors);
        const firstFocusableElement = focusableElements[0] as HTMLElement;
        const lastFocusableElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [elementRef]);
}
