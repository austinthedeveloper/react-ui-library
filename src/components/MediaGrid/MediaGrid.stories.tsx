import type { Meta, StoryObj } from "@storybook/react-vite";
import MediaGrid from "./MediaGrid";
import { DummyMedia, DummyMediaExtremes } from "../../storybook/helpers";

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
    items: DummyMedia,
  },
};
export const ExtremeValues: Story = {
  args: {
    title: "All Titles",
    columns: 4,
    items: DummyMediaExtremes,
  },
};
