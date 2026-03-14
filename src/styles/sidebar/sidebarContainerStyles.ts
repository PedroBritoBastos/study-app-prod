export const styles = {
  container: {
    w: { base: "100%", md: "400px" },
    h: "100vh",
    bg: "white",
    pos: "fixed",
    top: 0,
    right: 0,
    zIndex: 100,
    boxShadow: "xl",
    borderLeft: "1px solid",
    borderColor: "gray.200",
    px: 6,
    py: 5,
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
  },

  header: {
    container: {
      align: "center",
      justify: "space-between",
      pos: "sticky",
      top: 0,
      bg: "white",
      zIndex: 1,
      pb: 4,
    },
    heading: {
      fontSize: "2xl",
      fontWeight: "semibold",
      color: "purple.700",
    },
  },

  content: {
    flex: 1,
    overflowY: "auto",
    pt: 4,
    px: 3,
  },
};
