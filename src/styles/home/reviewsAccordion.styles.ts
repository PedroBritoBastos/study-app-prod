export const styles = {
  container: {
    w: "180px",
    position: "absolute",
    zIndex: 99,
    top: 0,
    right: 0,
  },
  buttonContainer: {
    justify: "flex-end",
  },
  button: {
    color: "purple.700",
    borderRadius: "full",
    bg: "white",
    border: "1px solid",
    borderColor: "gray.200",
    boxShadow: "sm",
    _hover: { color: "white", bg: "purple.600" },
  },
  buttonWarning: {
    w: "15px",
    h: "15px",
    bg: "red.500",
    borderRadius: "full",
    position: "absolute",
    right: 0,
  },
  buttonActive: {
    bg: "purple.600",
    color: "white",
  },
  reviewsStack: {
    h: "0px",
    overflow: "hidden",
    transition: "height 0.5s ease-in-out",
    gap: 5,
  },
  reviewsStackActive: {
    h: "400px",
  },
  review: {
    container: {
      bg: "white",
      borderRadius: "xl",
      border: "1px solid",
      borderColor: "gray.200",
      boxShadow: "sm",
      py: 4,
      px: 8,
    },
    header: {
      textAlign: "center",
      fontSize: "md",
      color: "purple.700",
      fontWeight: "semibold",
    },
    title: {
      textAlign: "center",
      fontSize: "md",
      color: "purple.700",
      fontWeight: "medium",
    },
  },
};
