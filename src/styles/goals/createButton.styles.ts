export const styles = {
  cardRoot: {
    bg: "rgba(237, 242, 247, 1)",
    _hover: { bg: "rgb(253, 254, 255)" },
    w: "100%",
    h: "19rem",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    color: "gray.500",
    borderRadius: "2xl",
    borderColor: "gray.200",
    boxShadow: "sm",
    cursor: "pointer",
  },
  input: {
    bg: "gray.200",
  },
  icon: {
    size: "3em",
  },
  text: {
    fontSize: "lg",
  },
  createMode: {
    p: 4,
    justifyContent: "space-evenly",
    _hover: { bg: "rgba(237, 242, 247, 1)" },
    cursor: "initial",
  },
  createLabel: {
    color: "purple.700",
    mb: 2,
    mt: 3,
  },
  createModeButtonContainer: {
    gap: 3,
  },
  createModeAddButton: {
    bg: "purple.600",
    _hover: { bg: "purple.400" },
  },
  createModeCancelButton: {
    bg: "white",
    color: "purple.700",
    _hover: { bg: "purple.300", color: "white" },
  },
};
