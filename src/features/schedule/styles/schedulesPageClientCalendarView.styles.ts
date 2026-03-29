export const styles = {
  dayOfWeekGrid: {
    my: 3,
    templateColumns: "repeat(7, 1fr)",
    gap: 2,
    pr: 4,
  },
  dayOfWeek: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "sm",
    color: "white",
    bg: "purple.600",
    py: 1,
    roundedTop: "md",
    height: "fit-content",
  },
  monthDaysGrid: {
    templateColumns: "repeat(7, 1fr)",
    gridAutoRows: "150px",
    gap: 2,
    height: "100%",
    minH: 0,
    overflowY: "auto",
    pr: 2,
  },
};
