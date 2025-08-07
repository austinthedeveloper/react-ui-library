import type { Meta, StoryObj } from "@storybook/react-vite";
import MediaCarousel from "./MediaCarousel";

const meta: Meta<typeof MediaCarousel> = {
  title: "Components/MediaCarousel",
  component: MediaCarousel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MediaCarousel>;

export const Default: Story = {
  args: {
    title: "Featured Titles",
    items: Array.from({ length: 10 }).map((_, i) => ({
      imageUrl: "/public/movies/image.png",
      title: `Movie ${i + 1}`,
      label: i % 3 === 0 ? "NEW" : undefined,
    })),
  },
};
export const LargeScroll: Story = {
  args: {
    ...Default.args,
    cardsPerScroll: 4,
  },
};
