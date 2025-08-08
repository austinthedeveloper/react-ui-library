import type { Meta, StoryObj } from "@storybook/react-vite";
import MediaCarousel from "./MediaCarousel";
import { DummyMedia, DummyMediaExtremes } from "../../storybook/helpers";

const meta: Meta<typeof MediaCarousel> = {
  title: "Media Components/MediaCarousel",
  component: MediaCarousel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MediaCarousel>;

export const Default: Story = {
  args: {
    title: "Featured Titles",
    items: DummyMedia,
  },
};
export const ExtremeValues: Story = {
  args: {
    title: "Featured Titles",
    items: DummyMediaExtremes,
  },
};
export const LargeScroll: Story = {
  args: {
    ...Default.args,
    cardsPerScroll: 4,
  },
};
