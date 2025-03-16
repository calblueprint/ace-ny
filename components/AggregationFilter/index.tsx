import { Arrow } from '@/assets/Aggregation-Filter-Icons/icons';
import {
  AggregationFilterBackground,
  AggregationFilterStyles,
  Header,
  HeaderContainer,
  HeaderText,
  Tab,
  TotalText,
  UpsideDownArrow,
} from './styles';

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
        <HeaderContainer>
          <Header>
            {/* <Tab>
            <HeaderText>PROJECTS</HeaderText>
          </Tab>
          <Tab>
            <HeaderText>ENERGY</HeaderText>
          </Tab> */}
          </Header>
          <UpsideDownArrow
            onClick={() => setAggFilterisVisible(!aggFilterisVisible)}
          >
            <Arrow />
          </UpsideDownArrow>
        </HeaderContainer>

        <TotalText>TOTAL: 1234</TotalText>
      </AggregationFilterStyles>
    </AggregationFilterBackground>
  );
}
