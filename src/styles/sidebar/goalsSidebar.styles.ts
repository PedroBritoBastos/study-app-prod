export const styles = {
  container: {
    justify: "space-between",
    h: "100%",
    gap: 6,
  },
  statusText: {
    fontSize: "md",
    color: "purple.600",
  },
  tasksStack: {
    my: 4,
    bg: "rgba(237, 242, 247, 1)",
    p: 3,
    borderRadius: "md",
    gap: 4,
    maxH: "200px",
    overflowY: "auto",
    border: "1px solid rgb(217, 223, 230)",
  },
  createTaskStack: {
    bg: "rgba(237, 242, 247, 1)",
    p: 3,
    borderRadius: "md",
    border: "1px solid rgb(217, 223, 230)",
  },
  task: {
    bg: "white",
    borderRadius: "md",
    py: 2,
    px: 4,
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
  },
  deleteButton: {
    bg: "purple.600",
    _hover: { bg: "purple.400" },
  },
  progressContainer: {
    gap: 8,
    mb: 4,
  },
  progressIndicator: {
    textAlign: "center",
    fontSize: "4xl",
    fontWeight: "bold",
    color: "purple.700",
  },
  progressIndicatorCompleted: {
    color: "green.400",
  },
  progressBar: {
    track: {
      height: "1.8rem",
    },
    range: {
      bg: "purple.600",
      color: "white",
    },
    completed: {
      bg: "green.400",
    },
  },
  statusIndicator: {
    color: "purple.700",
    textAlign: "center",
  },
  statusIndicatorCompleted: {
    color: "green.400",
  },
  statusIndicatorInProgress: {
    color: "red.400",
  },
};
