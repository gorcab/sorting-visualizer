import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  displayName: string;
  children: React.ReactNode;
  portalId?: string;
};

let id = 1;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ displayName, children }, ref) => {
    const element = useRef<HTMLDivElement>(document.createElement("div"));
    const [shouldOpen] = useState(!element.current.parentElement);

    useImperativeHandle(ref, () => element.current);

    useEffect(() => {
      if (!element.current) return;
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
);
