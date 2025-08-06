import type { Meta, StoryObj } from "@storybook/react-vite";
import MediaCard from "./MediaCard";

const meta: Meta<typeof MediaCard> = {
  title: "Components/MediaCard",
  component: MediaCard,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    imageUrl: "src/assets/movies/dummy-image-01.png", // drop the image in your public folder
    title: "Movie Title",
    size: "md",
    label: "NEW",
  },
};

export const LargeWithClick: Story = {
  args: {
    imageUrl: "src/assets/movies/dummy-image-01.png",
    title: "Epic Adventure",
    size: "lg",
    label: "HD",
    onClick: () => alert("Card clicked!"),
  },
};
