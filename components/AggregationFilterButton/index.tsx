import {
  Arrow,
  LightningIcon,
  Line,
  WorldIcon,
} from '@/assets/Aggregation-Filter-Icons/icons';
import COLORS from '@/styles/colors';
import {
  AggregationFilterButtonBackground,
  AggregationFilterButtonStyles,
  TextStyles,
} from './styles';

interface AggregationFilterButtonProps {
  aggFilterisVisible: boolean;
  setAggFilterisVisible: (visible: boolean) => void;
  infoModalisVisible: boolean;
  setInfoModalisVisible: (visible: boolean) => void;
  numProjects: string;
  totalEnergy: string;
}

export default function AggregationFilterButton({
  aggFilterisVisible,
  setAggFilterisVisible,
  infoModalisVisible,
  setInfoModalisVisible,
  numProjects,
  totalEnergy,
}: AggregationFilterButtonProps) {
  function handleClick() {
    setAggFilterisVisible(!aggFilterisVisible);
    if (infoModalisVisible) {
      setInfoModalisVisible(false);
    }
  }
  return (
    <AggregationFilterButtonBackground onClick={handleClick}>
      <AggregationFilterButtonStyles>
        <WorldIcon stroke={COLORS.navy} />
        <TextStyles>{numProjects} PROJECTS</TextStyles>
        <Line />
        <LightningIcon stroke={COLORS.navy} />
        <TextStyles>{totalEnergy} MW</TextStyles>
        <Arrow />
      </AggregationFilterButtonStyles>
    </AggregationFilterButtonBackground>
  );
}
