import { motion } from "framer-motion";
import { css } from "stitches.config";
import { useDrawer } from "features/common/contexts/drawer";

export function DrawerToggleButton() {
  const { isOpen, toggleOpen } = useDrawer();

  return (
    <button className={buttonClass()} onClick={() => toggleOpen()}>
      <svg width="30" height="30" viewBox="0 0 23 23">
        <Line
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M 2 4 L 20 4" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Line
          initial={false}
          animate={isOpen ? "open" : "closed"}
          d="M 2 12 L 20 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Line
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M 2 20 L 20 20" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
}

function Line(props: any) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="#ffffff"
      strokeLinecap="round"
      {...props}
    />
  );
}

const buttonClass = css({
  outline: "none",
  border: "none",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: 10,
  transform: "translate3D(0, -50%, 0)",
  zIndex: 1000,

  "@lg": {
    display: "none",
  },
});
