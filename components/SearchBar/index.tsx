import { SearchExit, SearchIcon } from '@/assets/SearchBar-Icons/icons';
import {
  SearchBarBackgroundStyles,
  SearchBarDiv,
  SearchBarPaddingStyles,
  SearchBarStyles,
} from './styles';

export const SearchBar = () => {
  return (
    <SearchBarPaddingStyles>
      <SearchBarBackgroundStyles>
        <SearchBarDiv>
          <SearchIcon />
          <SearchBarStyles type="text" placeholder="Search for a project" />
          <SearchExit />
        </SearchBarDiv>
      </SearchBarBackgroundStyles>
    </SearchBarPaddingStyles>
  );
};
