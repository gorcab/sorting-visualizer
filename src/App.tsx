import { globalCss } from "@stitches/react";
import { AnimationSection } from "features/common/components/AnimationSection";
import { Header } from "features/common/components/Header";
import { AlgorithmProvider } from "features/common/contexts/algorithm";
import { DrawerProvider } from "features/common/contexts/drawer";
import { css } from "stitches.config";

function App() {
  globalStyles();

  return (
    <AlgorithmProvider>
      <div className={fullScreenFlexContainerClass()}>
        <DrawerProvider>
          <Header />
        </DrawerProvider>
        <main className={mainClass()}>
          <AnimationSection />
        </main>
      </div>
    </AlgorithmProvider>
  );
}

const globalStyles = globalCss({
  "*, ::before, ::after": { boxSizing: "border-box", margin: 0, padding: 0 },
  "ul, ol": { listStyle: "none" },
});

const fullScreenFlexContainerClass = css({
  background: "$bg",
  color: "$white",
  height: "$space$h_screen",
  display: "flex",
  flexDirection: "column",
});

const mainClass = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export default App;
