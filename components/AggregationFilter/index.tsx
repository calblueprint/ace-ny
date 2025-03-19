import {
  Arrow,
  DownloadIcon,
  LightningIcon,
  WorldIcon,
} from '@/assets/Aggregation-Filter-Icons/icons';
import COLORS from '@/styles/colors';
import {
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  SolarPvIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import {
  AggregationFilterBackground,
  AggregationFilterStyles,
  ContentContainer,
  ContentContainerHeader,
  DownloadButton,
  DownloadText,
  Header,
  HeaderContainer,
  HeaderText,
  Tab,
  TechnologyRowStyles,
  TechnologyStyles,
  TechnologyWrapperStyles,
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
          <ContentContainerHeader>
            <TotalText>TOTAL: 1234</TotalText>

            <DownloadButton>
              <DownloadText>DOWNLOAD</DownloadText>
              <DownloadIcon />
            </DownloadButton>
          </ContentContainerHeader>

          <TechnologyWrapperStyles>
            <TechnologyRowStyles>
              <TechnologyStyles>
                <LandBasedWindIcon
                  fill={COLORS.skyBlue}
                  width="9.811px"
                  height="13px"
                />
                Land-Based Wind
              </TechnologyStyles>
              1
            </TechnologyRowStyles>

            <TechnologyRowStyles>
              <TechnologyStyles>
                <HydroelectricIcon
                  fill={COLORS.frenchBlue}
                  width="12px"
                  height="9px"
                />
                Hydroelectric
              </TechnologyStyles>
              2
            </TechnologyRowStyles>

            <TechnologyRowStyles>
              <TechnologyStyles>
                <OffshoreWindIcon
                  fill={COLORS.electricBlue}
                  stroke={COLORS.navy}
                  width="10.547px"
                  height="13px"
                />
                Offshore Wind
              </TechnologyStyles>
              3
            </TechnologyRowStyles>

            <TechnologyRowStyles>
              <TechnologyStyles>
                <SolarPvIcon
                  fill={COLORS.solarYellow}
                  width="13.112px"
                  height="13px"
                />
                Solar PV
              </TechnologyStyles>
              4
            </TechnologyRowStyles>

            <TechnologyRowStyles>
              <TechnologyStyles>
                <GeothermalIcon
                  fill={COLORS.earthyGreen}
                  width="11px"
                  height="11px"
                />
                Geothermal
              </TechnologyStyles>
              5
            </TechnologyRowStyles>
          </TechnologyWrapperStyles>
        </ContentContainer>
      </AggregationFilterStyles>
    </AggregationFilterBackground>
  );
}
