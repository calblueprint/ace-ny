import { AggregationFilterBackground, AggregationFilterStyles } from './styles';

interface AggregationFilterProps {
  aggFilterisVisible: boolean;
  setAggFilterisVisible: (visible: boolean) => void;
}

export default function AggregationFilter({
  aggFilterisVisible,
  setAggFilterisVisible,
}: AggregationFilterProps) {
  return (
    <AggregationFilterBackground>
      <AggregationFilterStyles>
        <button onClick={() => setAggFilterisVisible(!aggFilterisVisible)}>
          close
        </button>
      </AggregationFilterStyles>
    </AggregationFilterBackground>
  );
}
