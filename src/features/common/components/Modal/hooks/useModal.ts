import { useClickOutside } from "features/common/hooks/useClickOutside";
import { useFocusTrap } from "features/common/hooks/useFocusTrap";
import { MutableRefObject, useEffect } from "react";

type UseModalOptions = {
  portalElementRef: MutableRefObject<HTMLElement | null>;
  modalElementRef: MutableRefObject<HTMLElement | null>;
  onClose: (event: MouseEvent) => void;
};

export function useModal({
  modalElementRef,
  portalElementRef,
  onClose,
}: UseModalOptions) {
  useClickOutside(modalElementRef, onClose);

  useFocusTrap({ elementRef: modalElementRef });

  useEffect(() => {
    if (!portalElementRef.current) return;

    const portalElement = portalElementRef.current;
    const childrenOfBody = document.body.children;

    Array.from(childrenOfBody).forEach((child) => {
      if (child !== portalElement) {
        (child as HTMLElement).setAttribute("aria-hidden", "true");
      }
    });

    return () => {
      Array.from(childrenOfBody).forEach((child) => {
        if (child !== portalElement) {
          (child as HTMLElement).removeAttribute("aria-hidden");
        }
      });
    };
  }, [portalElementRef]);
}
