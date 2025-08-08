import type { Meta, StoryObj } from "@storybook/react-vite";
import Playing from "./Playing";

const meta: Meta<typeof Playing> = {
  component: Playing,
  title: "Streaming/Playing",
  decorators: [
    (Story) => (
      <div
        style={{
          height: "600px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Playing>;

export const Default: Story = {
  args: {
    title: "Movie Title 1",
    currentTime: "52:31",
    duration: "01:55:15",
  },
};
