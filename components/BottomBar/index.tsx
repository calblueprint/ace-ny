import { useState } from 'react';
import AggregationFilter from '../AggregationFilter';
import AggregationFilterButton from '../AggregationFilterButton';
import InfoModalButton from '../InfoModalButton';
import { BottomBarContainer } from './styles';

export default function BottomBar() {
  const [aggFilterisVisible, setAggFilterisVisible] = useState(false);
  const [infoModalisVisible, setInfoModalisVisible] = useState(false);

  return (
    <BottomBarContainer>
      {!aggFilterisVisible && (
        <AggregationFilterButton
          aggFilterisVisible={aggFilterisVisible}
          setAggFilterisVisible={setAggFilterisVisible}
          infoModalisVisible={infoModalisVisible}
          setInfoModalisVisible={setInfoModalisVisible}
        />
      )}
      {aggFilterisVisible && (
        <AggregationFilter
          aggFilterisVisible={aggFilterisVisible}
          setAggFilterisVisible={setAggFilterisVisible}
        />
      )}

      <InfoModalButton
        aggFilterisVisible={aggFilterisVisible}
        setAggFilterisVisible={setAggFilterisVisible}
        infoModalisVisible={infoModalisVisible}
        setInfoModalisVisible={setInfoModalisVisible}
      ></InfoModalButton>
    </BottomBarContainer>
  );
}
