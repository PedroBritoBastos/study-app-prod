export const styles = {
  cardRoot: {
    p: 3,
    border: "md",
    borderColor: "purple.200",
  },
  cardHeader: {
    p: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dayContainer: {
    width: "fit-content",
    py: 1,
    px: 2,
    bg: "purple.300",
    color: "white",
    fontSize: "xs",
    fontWeight: "semibold",
    border: "md",
    borderColor: "purple.400",
    rounded: "md",
  },
  cardBody: {
    p: 0,
    pt: 2,
    minH: 0,
    overflowY: "hidden",
  },
  task: {
    fontSize: "xs",
    bg: "orange.100",
    border: "1px solid #FBD38D",
    rounded: "md",
    minW: 0,
    overflowX: "hidden",
    px: 2,
  },
  remainingTasksWarning: {
    fontSize: "xs",
    color: "gray.400",
  },
};
