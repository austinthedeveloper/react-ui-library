import React from "react";
import "./Spinner.scss";

type SpinnerProps = {
  message?: string;
  fullscreen?: boolean; // fixed overlay if true
  dimBackground?: boolean; // dark overlay when fullscreen
  size?: number; // width in px (height is auto)
};

const Spinner: React.FC<SpinnerProps> = ({
  message,
  fullscreen = false,
  dimBackground = true,
  size = 260,
}) => {
  return (
    <div
      className={
        "spinner-root" + (fullscreen ? " spinner-root--fullscreen" : "")
      }
      data-dim={dimBackground && fullscreen ? "1" : "0"}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="filmstrip" style={{ width: size }}>
        <div className="holes holes--top" />
        <div className="strip-track">
          <div className="frame" />
          <div className="frame" />
          <div className="frame" />
          <div className="frame" />
          <div className="frame" />
          <div className="frame" />
        </div>
        <div className="holes holes--bottom" />
      </div>

      {message && <div className="spinner-msg">{message}</div>}
    </div>
  );
};

export default Spinner;
