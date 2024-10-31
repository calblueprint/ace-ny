import { AiOutlineClose } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {
  IconStyles,
  SearchBarBackgroundStyles,
  SearchBarPaddingStyles,
  SearchBarStyles,
} from './styles';

export const SearchBar = () => {
  return (
    <SearchBarPaddingStyles>
      <SearchBarBackgroundStyles>
        <IconStyles>
          <IoIosSearch />
        </IconStyles>
        <SearchBarStyles type="text" placeholder="Search for a project" />
        <IconStyles>
          <AiOutlineClose />
        </IconStyles>
      </SearchBarBackgroundStyles>
    </SearchBarPaddingStyles>
  );
};
