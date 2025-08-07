export const DummyMedia = Array.from({ length: 20 }).map((_, i) => ({
  imageUrl: "/movies/image.png",
  title: `Movie ${i + 1}`,
  label: i % 3 === 0 ? "NEW" : undefined,
  progress: Math.random() * 100,
  onClick: () => alert("Card clicked!"),
}));
export const DummyMediaExtremes = Array.from({ length: 20 }).map((_, i) => ({
  imageUrl: "/movies/image.png",
  title: `Movie ${i + 1}`,
  label: i % 3 === 0 ? "NEW" : undefined,
  progress: Math.random() < 0.5 ? 0 : 100,
  onClick: () => alert("Card clicked!"),
}));
