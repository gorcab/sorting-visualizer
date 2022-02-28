import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  displayName: string;
  children: React.ReactNode;
};

let id = 1;

export function Portal({ displayName, children }: PortalProps) {
  const element = useRef<HTMLDivElement>(document.createElement("div"));
  const [shouldOpen] = useState(!element.current.parentElement);

  useEffect(() => {
    const portalElem = element.current;
    if (shouldOpen) {
      portalElem.id = `${displayName}-${id}`;
      id++;
      document.body.appendChild(portalElem);
    }

    return () => {
      if (shouldOpen && portalElem.parentElement) {
        portalElem.parentElement.removeChild(portalElem);
      }
    };
  }, [shouldOpen, displayName]);

  return createPortal(children, element.current);
}
