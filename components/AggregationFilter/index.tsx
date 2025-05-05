import { useState } from 'react';
import { Arrow, GraphIcon } from '@/assets/Aggregation-Filter-Icons/icons';
import COLORS from '@/styles/colors';
import { Project } from '@/types/schema';
import {
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  SolarPvIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import DownloadData from '../DownloadData';
import {
  AggregationFilterBackground,
  AggregationFilterStyles,
  AggregationFilterText,
  ContentContainer,
  ContentContainerHeader,
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
  numProjects: string;
  totalEnergy: string;
  numProjectsArr: string[];
  totalEnergyArr: string[];
  projects: Project[];
}

export default function AggregationFilter({
  aggFilterisVisible,
  setAggFilterisVisible,
  numProjects,
  totalEnergy,
  numProjectsArr,
  totalEnergyArr,
  projects,
}: AggregationFilterProps) {
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

  return (
    <AggregationFilterBackground>
      <AggregationFilterStyles>
        <HeaderContainer>
          <TechnologyStyles>
            <GraphIcon />
            <AggregationFilterText>AGGREGATION</AggregationFilterText>
          </TechnologyStyles>
          <UpsideDownArrow
            onClick={() => setAggFilterisVisible(!aggFilterisVisible)}
          >
            <Arrow />
          </UpsideDownArrow>
        </HeaderContainer>

        <Header>
          <Tab
            $isActive={activeTab === 'PROJECTS'}
            onClick={() => setActiveTab('PROJECTS')}
          >
            <HeaderText>PROJECTS</HeaderText>
          </Tab>
          <Tab
            $isActive={activeTab === 'ENERGY'}
            onClick={() => setActiveTab('ENERGY')}
          >
            <HeaderText>ENERGY</HeaderText>
          </Tab>
        </Header>

        <ContentContainer>
          <ContentContainerHeader>
            <TotalText>
              {activeTab === 'PROJECTS' ? numProjects : totalEnergy}
              &nbsp;
              {activeTab === 'PROJECTS' ? 'PROJECTS' : 'MW'}
            </TotalText>

            <DownloadData filteredProjects={projects} />
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
                    ? numProjectsArr[index]
                    : totalEnergyArr[index]}
                </TechnologyRowStyles>
              );
            })}
          </TechnologyWrapperStyles>
        </ContentContainer>
      </AggregationFilterStyles>
    </AggregationFilterBackground>
  );
}
