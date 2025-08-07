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
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    imageUrl: "/public/movies/image.png", // drop the image in your public folder
    title: "Movie Title",
  },
};

export const NoTitleOrLabel: Story = {
  args: {
    imageUrl: "/public/movies/image.png",
  },
};
export const NewLabel: Story = {
  args: {
    imageUrl: "/public/movies/image.png",
    title: "Epic Adventure",
    label: "New",
  },
};
export const LargeWithClick: Story = {
  args: {
    imageUrl: "/public/movies/image.png",
    title: "Epic Adventure",
    size: "lg",
    label: "HD",
    onClick: () => alert("Card clicked!"),
  },
};
export const LongTitle: Story = {
  args: {
    imageUrl: "/public/movies/image.png",
    title: "Epic Adventure Epic Adventure Epic Adventure Epic Adventure",
  },
};

export const ImageWrongProportions: Story = {
  args: {
    imageUrl: "/public/movies/dummy-image-01.png",
    title: "Epic Adventure Epic Adventure Epic Adventure Epic Adventure",
  },
};
