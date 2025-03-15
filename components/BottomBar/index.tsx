import { useState } from 'react';
import AggregationFilter from '../AggregationFilter';
import AggregationFilterButton from '../AggregationFilterButton';
import InfoModalButton from '../InfoModalButton';
import { BottomBarContainer } from './styles';

export default function BottomBar() {
  const [aggFilterisVisible, setAggFilterisVisible] = useState(false);

  return (
    <BottomBarContainer>
      {!aggFilterisVisible && (
        <AggregationFilterButton
          aggFilterisVisible={aggFilterisVisible}
          setAggFilterisVisible={setAggFilterisVisible}
        />
      )}
      {aggFilterisVisible && (
        <AggregationFilter
          aggFilterisVisible={aggFilterisVisible}
          setAggFilterisVisible={setAggFilterisVisible}
        />
      )}
      <InfoModalButton></InfoModalButton>
    </BottomBarContainer>
  );
}
