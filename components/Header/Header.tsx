import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

const Header = () => (
  <header className={css.header}>
    <Link href="/" className={css.headerLink} aria-label="Home">
      NoteHub
    </Link>
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li className={css.navigationItem}>
          <Link href="/" className={css.navigationLink}>
            Home
          </Link>
        </li>
        <li className={css.navigationItem}>
          <TagsMenu />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
