import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { VolumeControl } from "./VolumeControl";

const meta: Meta<typeof VolumeControl> = {
  component: VolumeControl,
  title: "Media Components/VolumeControl",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VolumeControl>;

export const Default: Story = {
  render: () => {
    const [volume, setVolume] = useState(0.6);
    const [isMuted, setIsMuted] = useState(false);

    const handleChange = (v: number) => {
      setVolume(v);
      if (v > 0 && isMuted) setIsMuted(false);
    };

    const handleToggleMute = () => {
      setIsMuted((prev) => !prev);
    };

    return (
      <div
        style={{
          padding: "4rem 2rem",
          background: "#111",
          color: "white",
          height: "300px",
          display: "flex",
          alignItems: "end",
        }}
      >
        <VolumeControl
          value={isMuted ? 0 : volume}
          isMuted={isMuted}
          onChange={handleChange}
          onToggleMute={handleToggleMute}
        />
      </div>
    );
  },
};
