import {
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
}

export default function AggregationFilterButton({
  aggFilterisVisible,
  setAggFilterisVisible,
}: AggregationFilterButtonProps) {
  return (
    <AggregationFilterButtonBackground
      onClick={() => setAggFilterisVisible(!aggFilterisVisible)}
    >
      <AggregationFilterButtonStyles>
        <WorldIcon />
        <TextStyles>114 PROJECTS</TextStyles>
        <Line />
        <LightningIcon />
        <TextStyles>10,820 MW</TextStyles>
      </AggregationFilterButtonStyles>
    </AggregationFilterButtonBackground>
  );
}
