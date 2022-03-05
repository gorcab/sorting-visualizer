import { useRef } from "react";
import { css } from "stitches.config";
import { CloseIconButton } from "../../CloseIconButton";
import { Overlay } from "../../Overlay";
import { Portal } from "../../Portal";
import { useModal } from "../hooks/useModal";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ title, children, onClose }: ModalProps) {
  const portalRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  useModal({
    modalElementRef: modalRef,
    portalElementRef: portalRef,
    onClose: onClose,
  });

  return (
    <Portal ref={portalRef} displayName="modal">
      <section
        ref={modalRef}
        className={modalSectionClass()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
      >
        <header className={headerClass()}>
          <h2 id="title">{title}</h2>
          <CloseIconButton onClose={onClose} />
        </header>
        {children}
      </section>
      <Overlay zIndex={1000} />
    </Portal>
  );
}

const modalSectionClass = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate3D(-50%, -50%, 0)",
  backgroundColor: "$bg",
  color: "$white",
  width: "90%",
  zIndex: 2000,
  padding: "$base",
  borderRadius: "0.5rem",

  "@md": {
    width: "$100",
  },
});

const headerClass = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginBottom: "$base",
  justifyContent: "space-between",
});
