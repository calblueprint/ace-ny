import * as styles from './styles';

export const SearchBar = ({
  onSearchChange,
}: {
  onSearchChange: () => void;
}) => {
  return (
    <div style={styles.searchBarStyles}>
      <input type="text" placeholder="Search" />
      <button onClick={onSearchChange}>Search</button>
    </div>
  );
};
