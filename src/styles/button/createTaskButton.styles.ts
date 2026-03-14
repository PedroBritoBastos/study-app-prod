export const styles = {
  button: {
    bg: "purple.600",
    _hover: { bg: "purple.400" },
    transition: "height 0.5s ease-in-out",
  },
  open: {
    h: "fit-content",
  },
  createTaskContainer: {
    bg: "white",
    p: 5,
    mt: 4,
    borderRadius: "md",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
  },
  createTaskLabel: {
    color: "purple.800",
    fontSize: "md",
    mb: 2,
  },
  createTaskInput: {
    bg: "gray.100",
    flex: 4,
  },
  createTaskAddButton: {
    fontSize: "xs",
    flex: 1,
    bg: "purple.600",
    _hover: { bg: "purple.400" },
  },
  createTaskInputContainer: {
    gap: 2,
  },
};
