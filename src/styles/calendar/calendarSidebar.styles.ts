import { text } from "stream/consumers";

export const styles = {
  date: {
    container: {
      align: "center",
      gap: 2,
      color: "purple.700",
      mt: 2,
      pb: 4,
    },
    header: {
      letterSpacing: 1,
      fontWeight: "semibold",
    },
  },
  reviewsGrid: {
    mt: 5,
    templateColumns: "repeat(2, 1fr)",
    gap: 2,
    bg: "gray.100",
    p: 4,
    borderRadius: "md",
  },
  reviewsDescription: {
    container: {
      my: 3,
      bg: "gray.100",
      p: 4,
      borderRadius: "md",
    },
    title: {
      bg: "purple.500",
      color: "white",
      w: "fit-content",
      py: 1,
      px: 2,
      borderRadius: "md",
      mb: 5,
    },
  },
};
