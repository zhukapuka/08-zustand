import LayoutNotes from "@/components/LayoutNotes/LayoutNotes";
import styles from "@/components/LayoutNotes/LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <LayoutNotes>
      {sidebar}
      <div className={styles.notesWrapper}>{children}</div>
    </LayoutNotes>
  );
}
