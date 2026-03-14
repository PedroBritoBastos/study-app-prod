export const styles = {
  container: {
    bg: "white",
    borderRadius: "md",
    py: 2,
    px: 4,
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
    align: "center",
    justify: "space-between",
  },
  checkedContainer: {
    bg: "green.400",
    color: "white",
  },
  text: {},
  buttons: {
    container: {
      gap: 3,
    },
    deleteButton: {
      bg: "transparent",
      color: "purple.700",
      boxShadow: "2px 2px 5px rgba(226, 232, 240, 1)",
      _hover: { bg: "purple.700", color: "white" },
    },
    checkButton: {
      bg: "rgba(0, 0, 0, 0.16)",
      color: "purple.700",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
      _hover: { bg: "rgba(247, 250, 252, 0.29)" },
    },
    checkedButton: {
      bg: "green.400",
      color: "white",
      boxShadow: "2px 2px 5px rgba(226, 232, 240, 1)",
      _hover: { bg: "green.300" },
    },
    checkedStyle: {
      bg: "green.400",
      color: "white",
      boxShadow: "2px 2px 8px rgba(56, 161, 105, 0.6)",
      _hover: {
        bg: "green.300",
        boxShadow: "2px 2px 10px rgba(56, 161, 105, 0.8)",
      },
    },
  },
};
