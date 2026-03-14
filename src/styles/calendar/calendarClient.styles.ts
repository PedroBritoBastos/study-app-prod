export const styles = {
  monthControlContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    p: 5,
  },
  monthTitle: {
    fontSize: "3xl",
    fontWeight: "medium",
    color: "purple.800",
    textAlign: "center",
    textTransform: "capitalize",
  },
  grid: {
    flex: 1,
    templateColumns: "repeat(8, 1fr)",
    templateRows: "repeat(4, 1fr)",
    gap: 4,
    p: 8,
    minH: 0,
  },
};
