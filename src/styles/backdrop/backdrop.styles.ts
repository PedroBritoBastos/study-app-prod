export const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    w: "100vw",
    h: "100vh",
    bg: "blackAlpha.600",
    transition: "opacity 0.3s ease-in-out",
  },

  visible: {
    opacity: 1,
    pointerEvents: "auto",
  },

  hidden: {
    opacity: 0,
    pointerEvents: "none",
  },
};

type Props = {
  isOpen: boolean;
  onClick?: () => void;
  zIndex?: number;
};
