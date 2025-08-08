import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBarMedia } from "./ProgressBarMedia";

const meta: Meta<typeof ProgressBarMedia> = {
  title: "Media Components/ProgressBarMedia",
  component: ProgressBarMedia,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "300px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBarMedia>;

export const Default: Story = {
  args: {
    currentTime: "52:31",
    duration: "01:55:15",
    onSeek: (time) => alert(`Seek to: ${time}`),
  },
};
