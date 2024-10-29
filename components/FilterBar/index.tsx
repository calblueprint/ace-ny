import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Filter from '../../types/helper';
import * as styles from './styles';

interface Filter {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const FilterBar = ({
  filters,
  onFilterChange,
}: {
  filters: Filter[];
  onFilterChange: (filter: Filter) => void;
}) => {
  return (
    <div style={styles.filterBarStyles}>
      {filters.map(filter => (
        <div key={filter.id}>
          <button
            key={filter.label}
            onClick={() => onFilterChange(filter)}
            style={styles.filterButtonStyles}
          >
            {filter.icon}
            {filter.label}
            <RiArrowDropDownLine />
          </button>
        </div>
      ))}
    </div>
  );
};
