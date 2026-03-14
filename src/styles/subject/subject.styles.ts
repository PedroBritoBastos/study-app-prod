export const styles = {
  card: {
    root: {
      bg: "white",
      borderRadius: "xl",
      border: "1px solid",
      borderColor: "gray.200",
      boxShadow: "sm",
      cursor: "pointer",
      h: "13rem",
    },

    body: {
      p: 5,
    },
  },

  header: {
    container: {
      pb: 3,
      mb: 3,
      borderBottom: "1px solid",
      borderColor: "gray.200",
    },
    title: {
      fontSize: "lg",
      fontWeight: "medium",
      color: "purple.700",
    },
  },

  date: {
    container: {
      align: "center",
      gap: 2,
      mb: 3,
    },
    icon: {
      boxSize: "16px",
      opacity: 0.7,
    },
    text: {
      fontSize: "sm",
      color: "gray.500",
    },
  },

  content: {
    text: {
      fontSize: "sm",
      color: "gray.600",
      lineHeight: "tall",
    },
  },
};
