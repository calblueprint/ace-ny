import { useState } from 'react';
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
  function intToString(num: number) {
    return num.toLocaleString();
  }

  function intArrToStringArr(arr: number[]) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      res.push(intToString(arr[i]));
    }
    return res;
  }

  const [activeTab, setActiveTab] = useState('PROJECTS');

  const technologies = [
    {
      name: 'Land-Based Wind',
      icon: LandBasedWindIcon,
      color: COLORS.skyBlue,
      width: '9.811px',
      height: '13px',
    },
    {
      name: 'Hydroelectric',
      icon: HydroelectricIcon,
      color: COLORS.frenchBlue,
      width: '12px',
      height: '9px',
    },
    {
      name: 'Offshore Wind',
      icon: OffshoreWindIcon,
      color: COLORS.electricBlue,
      stroke: COLORS.navy,
      width: '10.547px',
      height: '13px',
    },
    {
      name: 'Solar PV',
      icon: SolarPvIcon,
      color: COLORS.solarYellow,
      width: '13.112px',
      height: '13px',
    },
    {
      name: 'Geothermal',
      icon: GeothermalIcon,
      color: COLORS.earthyGreen,
      width: '11px',
      height: '11px',
    },
  ];

  const totalNumProjects = intToString(1234);
  const totalProjectSizes = intToString(10820) + ' MW';
  const numProjects = intArrToStringArr([1000, 20, 30, 40, 50]);
  const projectSizes = intArrToStringArr([100, 200, 300, 400, 5000]);
  for (let i = 0; i < projectSizes.length; i++) {
    projectSizes[i] = projectSizes[i] + ' MW';
  }

  return (
    <AggregationFilterBackground>
      <AggregationFilterStyles>
        <HeaderContainer>
          <Header>
            <Tab
              $isActive={activeTab === 'PROJECTS'}
              onClick={() => setActiveTab('PROJECTS')}
            >
              <WorldIcon
                stroke={
                  activeTab === 'PROJECTS' ? COLORS.electricBlue : COLORS.navy
                }
              />
              <HeaderText>PROJECTS</HeaderText>
            </Tab>
            <Tab
              $isActive={activeTab === 'ENERGY'}
              onClick={() => setActiveTab('ENERGY')}
            >
              <LightningIcon
                stroke={
                  activeTab === 'ENERGY' ? COLORS.electricBlue : COLORS.navy
                }
              />
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
            <TotalText>
              TOTAL: &nbsp;{' '}
              {activeTab === 'PROJECTS' ? totalNumProjects : totalProjectSizes}
            </TotalText>

            <DownloadButton>
              <DownloadText>DOWNLOAD</DownloadText>
              <DownloadIcon />
            </DownloadButton>
          </ContentContainerHeader>

          <TechnologyWrapperStyles>
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <TechnologyRowStyles key={tech.name}>
                  <TechnologyStyles>
                    <Icon
                      fill={tech.color}
                      stroke={tech.stroke}
                      width={tech.width}
                      height={tech.height}
                    />
                    {tech.name}
                  </TechnologyStyles>
                  {activeTab === 'PROJECTS'
                    ? numProjects[index]
                    : projectSizes[index]}
                </TechnologyRowStyles>
              );
            })}
          </TechnologyWrapperStyles>
        </ContentContainer>
      </AggregationFilterStyles>
    </AggregationFilterBackground>
  );
}
