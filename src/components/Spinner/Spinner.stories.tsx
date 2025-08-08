import type { Meta, StoryObj } from "@storybook/react-vite";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Inline: Story = { args: { fullscreen: false, size: 260 } };
export const Fullscreen: Story = {
  args: { fullscreen: true, dimBackground: true, size: 320 },
};
export const Minimal: Story = {
  args: { fullscreen: false, message: "", size: 220 },
};
