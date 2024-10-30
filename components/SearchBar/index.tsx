import { AiOutlineClose } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import * as styles from './styles';

export const SearchBar = () => {
  return (
    <div style={styles.searchBarPaddingStyles}>
      <div style={styles.searchBarBackgroundStyles}>
        <IoIosSearch style={styles.iconStyles} />
        <input
          type="text"
          placeholder="Search for a project"
          style={styles.searchBarStyles}
        />
        <AiOutlineClose style={styles.iconStyles} />
      </div>
    </div>
  );
};
