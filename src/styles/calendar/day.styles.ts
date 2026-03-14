export const styles = {
  cardRoot: {
    h: "100%",
    minH: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    bg: "white",
    borderRadius: "md",
    boxShadow: "sm",
    p: 2.5,
    cursor: "pointer",
    _hover: { outline: "2px solid purple" },
  },
  cardHeader: {
    flexShrink: 0,
    fontSize: "sm",
    fontWeight: "bold",
    color: "purple.700",
    p: 0,
    mb: 2,
  },
  cardBody: {
    flex: 1,
    minH: 0,
    overflow: "hidden",
    p: 0,
  },
  reviewsStack: {
    h: "100%",
    overflow: "hidden",
  },
  active: {
    outline: "2px solid purple",
    bg: "purple.100",
  },
};
