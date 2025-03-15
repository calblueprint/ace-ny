import AggregationFilterButton from '../AggregationFilterButton';
import InfoModalButton from '../InfoModalButton';
import { BottomBarContainer } from './styles';

export default function BottomBar() {
  return (
    <BottomBarContainer>
      <AggregationFilterButton></AggregationFilterButton>
      <InfoModalButton></InfoModalButton>
    </BottomBarContainer>
  );
}
