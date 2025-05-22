import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ProjectSizeType } from '@/types/schema';

type FilterContextType = {
  tempMin: number;
  tempMax: number;
  selectedMin: number;
  selectedMax: number;
  projectSizeFilterTagHandler: (params: {
    value: ProjectSizeType;
    isTemp: boolean;
  }) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [tempMin, setTempMin] = useState<number>(0);
  const [tempMax, setTempMax] = useState<number>(100);

  const [selectedMin, setSelectedMin] = useState<number>(0);
  const [selectedMax, setSelectedMax] = useState<number>(100);

  const projectSizeFilterTagHandler = ({
    value,
    isTemp,
  }: {
    value: ProjectSizeType;
    isTemp: boolean;
  }) => {
    const setMin = isTemp ? setTempMin : setSelectedMin;
    const setMax = isTemp ? setTempMax : setSelectedMax;

    setMin(value.min);
    setMax(value.max);
  };

  return (
    <FilterContext.Provider
      value={{
        tempMin,
        tempMax,
        selectedMin,
        selectedMax,
        projectSizeFilterTagHandler,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
