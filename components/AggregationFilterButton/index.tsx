import {
  Arrow,
  LightningIcon,
  Line,
  WorldIcon,
} from '@/assets/Aggregation-Filter-Icons/icons';
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
}

export default function AggregationFilterButton({
  aggFilterisVisible,
  setAggFilterisVisible,
  infoModalisVisible,
  setInfoModalisVisible,
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
        <WorldIcon />
        <TextStyles>114 PROJECTS</TextStyles>
        <Line />
        <LightningIcon />
        <TextStyles>10,820 MW</TextStyles>
        <Arrow />
      </AggregationFilterButtonStyles>
    </AggregationFilterButtonBackground>
  );
}
