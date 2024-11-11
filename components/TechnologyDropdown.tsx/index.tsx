import SVGIcon from '@/components/SVGIcon';
import EnergyStorage from '../../assets/DropdownIcons/EnergyStorage.svg';
import Geothermal from '../../assets/DropdownIcons/Geothermal.svg';
import Hydroelectric from '../../assets/DropdownIcons/Hydroelectric.svg';
import LandbasedWind from '../../assets/DropdownIcons/LandbasedWind.svg';
import OffshoreWind from '../../assets/DropdownIcons/OffshoreWind.svg';
import PumpedStorage from '../../assets/DropdownIcons/PumpedStorage.svg';
import SolarPower from '../../assets/DropdownIcons/SolarPower.svg';
import {
  ApplyButtonStyles,
  CategoryTitleStyles,
  CheckboxContainer,
  CheckboxStyles,
  FilterDropdownStyles,
  OptionTitleStyles,
} from './styles';

interface TechnologyDropdownProps {
  selectedTechnologies: string[];
  setSelectedTechnologies: (technologies: string[]) => void;
}

export default function TechnologyDropdown({
  selectedTechnologies,
  setSelectedTechnologies,
}: TechnologyDropdownProps) {
  const filter = {
    categories: [
      {
        category: 'SOURCE',
        options: [
          {
            title: 'Land-based Wind',
            icon: <SVGIcon src={LandbasedWind} alt="Land-based Wind" />,
          },
          {
            title: 'Hydroelectric',
            icon: <SVGIcon src={Hydroelectric} alt="Hydroelectric" />,
          },
          {
            title: 'Offshore Wind',
            icon: <SVGIcon src={OffshoreWind} alt="Offshore Wind" />,
          },
          {
            title: 'Solar Power',
            icon: <SVGIcon src={SolarPower} alt="Solar Power" />,
          },
          {
            title: 'Geothermal',
            icon: <SVGIcon src={Geothermal} alt="Geothermal" />,
          },
        ],
      },
      {
        category: 'STORAGE',
        options: [
          {
            title: 'Energy Storage',
            icon: <SVGIcon src={EnergyStorage} alt="Energy Storage" />,
          },
          {
            title: 'Pumped Storage',
            icon: <SVGIcon src={PumpedStorage} alt="Pumped Storage" />,
          },
        ],
      },
    ],
  };
  return (
    <FilterDropdownStyles>
      {filter.categories.map(category => (
        <div key={category.category}>
          <CategoryTitleStyles>{category.category}</CategoryTitleStyles>
          {category.options.map(option => (
            <CheckboxContainer key={option.title}>
              {option.icon}
              <OptionTitleStyles>{option.title}</OptionTitleStyles>
              <CheckboxStyles
                type="checkbox"
                checked={selectedTechnologies.includes(option.title)}
                onChange={() => {
                  setSelectedTechnologies(
                    selectedTechnologies.includes(option.title)
                      ? selectedTechnologies.filter(o => o !== option.title)
                      : [...selectedTechnologies, option.title],
                  );
                }}
              />
            </CheckboxContainer>
          ))}
        </div>
      ))}
      <ApplyButtonStyles>APPLY</ApplyButtonStyles>
    </FilterDropdownStyles>
  );
}
