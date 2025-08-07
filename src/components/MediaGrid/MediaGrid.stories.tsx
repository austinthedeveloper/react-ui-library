import type { Meta, StoryObj } from "@storybook/react-vite";
import MediaGrid from "./MediaGrid";

const meta: Meta<typeof MediaGrid> = {
  title: "Components/MediaGrid",
  component: MediaGrid,
};

export default meta;
type Story = StoryObj<typeof MediaGrid>;

export const Default: Story = {
  args: {
    title: "All Titles",
    columns: 4,
    items: Array.from({ length: 20 }).map((_, i) => ({
      imageUrl: "/movies/image.png",
      title: `Movie ${i + 1}`,
      label: i % 3 === 0 ? "NEW" : undefined,
      progress: Math.random() * 100,
    })),
  },
};
