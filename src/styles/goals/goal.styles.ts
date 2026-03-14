export const styles = {
  cardRoot: {
    bg: "white",
    w: "100%",
    h: "19rem",
    borderRadius: "2xl",
    padding: 5,
    borderColor: "gray.200",
    boxShadow: "sm",
    cursor: "pointer",
    _hover: {
      bg: "purple.100",
      borderColor: "purple.700",
    },
  },
  cardHeader: {
    fontSize: "lg",
    color: "purple.800",
    fontWeight: "semibold",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 0,
    mb: 2,
    gap: 4,
  },
  goalTitle: {
    overflowX: "hidden",
    whiteSpace: "nowrap",
  },
  goalTitleCompleted: {
    color: "green.400",
  },
  deadline: {
    container: {
      mb: 4,
      gap: 2,
      alignItems: "center",
      py: 1,
      px: 2,
      border: "2px solid rgba(85, 60, 154, 1)",
      bg: "purple.300",
      fontSize: "sm",
      borderRadius: "md",
      color: "purple.800",
      fontWeight: "semibold",
    },
    completed: {
      borderColor: "red.800",
      color: "red.800",
      bg: "red.300",
    },
  },
  tasksStack: {
    my: "auto",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  progressContainer: {
    justify: "space-between",
    align: "center",
    mt: 4,
  },
  progressBar: {
    progressRoot: {
      colorPalette: "purple",
      flex: 2,
    },
    progressTrack: {
      flex: 1,
    },
    range: {
      color: "white",
      justifyContent: "flex-end",
      pr: 2,
    },
    completed: {
      bg: "green.400",
    },
  },
  completedTasks: {
    flex: 1,
    h: "fit-content",
    textAlign: "center",
    fontSize: "lg",
    fontWeight: "semibold",
    color: "purple.700",
  },
  completedTasksSpan: {
    fontSize: "2xl",
    fontWeight: "bold",
  },
  completedAllTasks: {
    color: "green.400",
  },
};
