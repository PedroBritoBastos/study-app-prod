export const styles = {
  container: {
    flex: 1,
    p: 8,
    flexDirection: "column",
    position: "relative",
    h: "100vh",
  },
  header: {
    container: {
      align: "center",
      mb: 8,
      gap: 6,
      position: "relative",
    },
    title: {
      fontSize: "3xl",
      fontWeight: "medium",
      color: "purple.800",
    },
  },

  grid: {
    flex: 1,
    templateRows: "auto",
    alignContent: "start",
    templateColumns: {
      sm: "repeat(1, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: 6,
    minH: 0,
    maxH: "100%",
    overflowY: "auto",
    p: 2,
  },
};
