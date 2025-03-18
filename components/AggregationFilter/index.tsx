import {
  Arrow,
  DownloadIcon,
  LightningIcon,
  WorldIcon,
} from '@/assets/Aggregation-Filter-Icons/icons';
import {
  AggregationFilterBackground,
  AggregationFilterStyles,
  ContentContainer,
  DownloadButton,
  // DownloadText,
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
            <Tab>
              <WorldIcon />
              <HeaderText>PROJECTS</HeaderText>
            </Tab>
            <Tab>
              <LightningIcon />
              <HeaderText>ENERGY</HeaderText>
            </Tab>
          </Header>
          <UpsideDownArrow
            onClick={() => setAggFilterisVisible(!aggFilterisVisible)}
          >
            <Arrow />
          </UpsideDownArrow>
        </HeaderContainer>

        <ContentContainer>
          <TotalText>TOTAL: 1234</TotalText>

          <DownloadButton>
            {/* <DownloadText>DOWNLOAD</DownloadText> */}
            <DownloadIcon />
          </DownloadButton>
        </ContentContainer>
      </AggregationFilterStyles>
    </AggregationFilterBackground>
  );
}
