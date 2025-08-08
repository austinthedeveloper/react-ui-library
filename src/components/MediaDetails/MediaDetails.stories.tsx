import type { Meta, StoryObj } from "@storybook/react-vite";
import MediaDetails from "./MediaDetails";
import type { MediaItemDetails } from "../../models";

const mockData: MediaItemDetails = {
  title: "The Last Ember",
  imageUrl: "/movies/image.png",
  description:
    "In a world on the brink of collapse, a reluctant hero must rekindle the flame of hope before darkness consumes everything.",
  year: 2023,
  runtime: "1h 57m",
  genres: ["Action", "Adventure", "Sci-Fi"],
  rating: "PG-13",
  director: "Ava Brooks",
  stars: ["Liam Torres", "Nina Shaw", "Kai Montgomery"],
  progress: 65,
};

const meta: Meta<typeof MediaDetails> = {
  title: "Media Components/MediaDetails",
  component: MediaDetails,
};

export default meta;
type Story = StoryObj<typeof MediaDetails>;

export const Default: Story = {
  args: {
    media: mockData,
    onPlay: () => alert("Play clicked"),
    onAddToList: () => alert("Add to Watchlist clicked"),
  },
};
