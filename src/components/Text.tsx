import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { useTheme } from "@/store/ThemeContext";
import styles from "@/styles/Text.module.scss";

const Text = ({ className, style, children }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const classes = `${styles.Text} ${darkMode ? `text-light` : `text-dark`}`;

  return (
    <p className={`${classes + ` ` + className}`} style={style}>
      <span style={style}>{children}</span>
    </p>
  );
};

export default Text;
