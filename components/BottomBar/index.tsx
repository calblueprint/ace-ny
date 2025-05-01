import { useEffect, useRef, useState } from 'react';
import { Project } from '@/types/schema';
import AggregationFilter from '../AggregationFilter';
import AggregationFilterButton from '../AggregationFilterButton';
import InfoModalButton from '../InfoModalButton';
import LegendButton from '../LegendButton';
import ZoomButton from '../ZoomButton';
import { BottomBarContainer } from './styles';

interface BottomBarProps {
  projects: Project[];
  selectedProjectId: number | null;
  map: google.maps.Map | null;
}

export default function BottomBar({
  projects,
  selectedProjectId,
  map,
}: BottomBarProps) {
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

  function sumNumProjectByTechnology(technology: string): number {
    return projects.reduce(
      (sum, project) =>
        project.renewable_energy_technology === technology ? sum + 1 : sum,
      0,
    );
  }

  function sumProjectSizeByTechnology(technology: string): number {
    return projects.reduce(
      (sum, project) =>
        project.renewable_energy_technology === technology
          ? sum + project.size
          : sum,
      0,
    );
  }

  const [aggFilterisVisible, setAggFilterisVisible] = useState(false);
  const [infoModalisVisible, setInfoModalisVisible] = useState(false);
  const [legendIsVisible, setLegendIsVisible] = useState(false);

  const numProjects = intToString(projects.length);
  const totalEnergy = intToString(
    projects.reduce((sum, project) => sum + project.size, 0),
  );

  const numProjectsArr = intArrToStringArr([
    sumNumProjectByTechnology('Land-Based Wind'),
    sumNumProjectByTechnology('Hydroelectric'),
    sumNumProjectByTechnology('Offshore Wind'),
    sumNumProjectByTechnology('Solar PV'),
    sumNumProjectByTechnology('Geothermal'),
  ]);
  const totalEnergyArr = intArrToStringArr([
    sumProjectSizeByTechnology('Land-Based Wind'),
    sumProjectSizeByTechnology('Hydroelectric'),
    sumProjectSizeByTechnology('Offshore Wind'),
    sumProjectSizeByTechnology('Solar PV'),
    sumProjectSizeByTechnology('Geothermal'),
  ]);
  for (let i = 0; i < totalEnergyArr.length; i++) {
    totalEnergyArr[i] = totalEnergyArr[i] + ' MW';
  }

  const prevSelectedProjectId = useRef<number | null>(null);

  useEffect(() => {
    if (
      selectedProjectId !== null &&
      selectedProjectId !== prevSelectedProjectId.current
    ) {
      setLegendIsVisible(false);
      setAggFilterisVisible(false);
      setInfoModalisVisible(false);
    }
    prevSelectedProjectId.current = selectedProjectId;
  }, [selectedProjectId]);

  return (
    <BottomBarContainer>
      {!aggFilterisVisible && (
        <AggregationFilterButton
          aggFilterisVisible={aggFilterisVisible}
          setAggFilterisVisible={setAggFilterisVisible}
          infoModalisVisible={infoModalisVisible}
          setInfoModalisVisible={setInfoModalisVisible}
          legendIsVisible={legendIsVisible}
          setLegendIsVisible={setLegendIsVisible}
          numProjects={numProjects}
          totalEnergy={totalEnergy}
        />
      )}
      {aggFilterisVisible && (
        <AggregationFilter
          aggFilterisVisible={aggFilterisVisible}
          setAggFilterisVisible={setAggFilterisVisible}
          numProjects={numProjects}
          totalEnergy={totalEnergy}
          numProjectsArr={numProjectsArr}
          totalEnergyArr={totalEnergyArr}
          projects={projects}
        />
      )}
      <LegendButton
        aggFilterisVisible={aggFilterisVisible}
        setAggFilterisVisible={setAggFilterisVisible}
        infoModalisVisible={infoModalisVisible}
        setInfoModalisVisible={setInfoModalisVisible}
        legendIsVisible={legendIsVisible}
        setLegendIsVisible={setLegendIsVisible}
      ></LegendButton>
      <InfoModalButton
        aggFilterisVisible={aggFilterisVisible}
        setAggFilterisVisible={setAggFilterisVisible}
        infoModalisVisible={infoModalisVisible}
        setInfoModalisVisible={setInfoModalisVisible}
        legendIsVisible={legendIsVisible}
        setLegendIsVisible={setLegendIsVisible}
      ></InfoModalButton>
      <ZoomButton map={map}></ZoomButton>
    </BottomBarContainer>
  );
}
