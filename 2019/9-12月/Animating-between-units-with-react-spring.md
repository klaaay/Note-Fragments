```javascript
const vhToPixel = value => `${(window.innerHeight * value) / 100}px`;
const vwToPixel = value => `${(window.innerWidth * value) / 100}px`;

import React from "react";
import { useSpring, animated } from "react-spring";

const App = () => {
  const [isExpanded, setExpanded] = React.useState(false);
  const ref = React.useRef < HTMLDivElement > null;

  const style = useSpring({
    width: isExpanded ? vwToPixel(100) : "200px",
    height: isExpanded ? vhToPixel(100) : "200px",
    borderRadius: isExpanded ? "0px" : "10px",
    onRest: () => {
      if (isExpanded && ref.current) {
        ref.current.style.height = "100vh";
        ref.current.style.width = "100vw";
      }
    }
  });

  return (
    <animated.div
      className="box"
      style={style}
      ref={ref}
      onClick={() => setExpanded(!isExpanded)}
    >
      I am a box
    </animated.div>
  );
};
```
