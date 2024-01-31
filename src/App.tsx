import React from "react";
import "./main.css";
// @ts-ignore
import ImagePlaceholder from "./placeholder-image.jpg";

const App = () => {
  const [state, setState] = React.useState(2);

  const onBtnClick = () => {
    throw new Error();
  };

  return (
    <div>
      <h1>{state}</h1>
      <img src={ImagePlaceholder} alt="image-placeholder" />

      <button onClick={() => setState((prevState) => prevState + 1)}>
        count
      </button>

      {/* example for debugging using Sourcemap */}
      <button onClick={onBtnClick}>imitate error</button>
    </div>
  );
};

export default App;
