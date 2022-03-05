import { motion } from "framer-motion";
import { css } from "stitches.config";
import { useDrawer } from "features/common/contexts/drawer";

export function DrawerToggleButton() {
  const { isOpen, toggleOpen } = useDrawer();

  return (
    <button className={buttonClass()} onClick={() => toggleOpen()}>
      <svg width="30" height="30" viewBox="0 0 30 30">
        <Line
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M 5 5 L 25 5" },
            open: { d: "M 5 25 L 25 5" },
          }}
        />
        <Line
          initial={false}
          animate={isOpen ? "open" : "closed"}
          d="M 5 15 L 25 15"
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
            closed: { d: "M 5 25 L 25 25" },
            open: { d: "M 5 5 L 25 25" },
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
  zIndex: 100,
  cursor: "pointer",

  "@lg": {
    display: "none",
  },
});
