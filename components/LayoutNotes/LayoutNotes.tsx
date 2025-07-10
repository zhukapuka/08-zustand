import styles from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: React.ReactNode;
}

const LayoutNotes: React.FC<LayoutNotesProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default LayoutNotes; 
