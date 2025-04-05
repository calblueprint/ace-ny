import React, { useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import COLORS from '@/styles/colors';
import { FiltersApplied, ProjectSizeType } from '@/types/schema';
import ProjectSizeSlider from '../ProjectSizeSlider';
import { HistogramContainer } from './styles';

interface HistogramProps {
  projectSizes: number[];
  setMinSize: (value: number) => void;
  setMaxSize: (value: number) => void;
  minDefault: number;
  setMinDefault: (value: number) => void;
  maxDefault: number;
  setMaxDefault: (value: number) => void;
  setSelectedSize: (value: ProjectSizeType) => void;
  minBound: number;
  maxBound: number;
  setFiltersApplied: React.Dispatch<React.SetStateAction<FiltersApplied>>;
}

export default function ProjectSizeHistogram({
  projectSizes,
  setMinSize,
  setMaxSize,
  minDefault,
  setMinDefault,
  maxDefault,
  setMaxDefault,
  setSelectedSize,
  minBound,
  maxBound,
  setFiltersApplied,
}: HistogramProps) {
  const numBins = 10;
  const minSize = Math.min(...projectSizes);
  const maxSize = Math.max(...projectSizes);
  const binSize = (maxSize - minSize) / numBins;
  const bins = Array(numBins).fill(0);

  useEffect(() => {
    const filteredSizes = projectSizes.filter(
      size =>
        size >= Math.max(0, minDefault) &&
        size <= Math.max(minSize, maxDefault),
    );

    if (filteredSizes && filteredSizes.length > 0) {
      const minSize = Math.min(...filteredSizes);
      const maxSize = Math.max(...filteredSizes);
      setMinSize(minSize);
      setMaxSize(maxSize);
    }

    setFiltersApplied((prevState: FiltersApplied) => ({
      ...prevState,
      projectSize: false,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    minDefault,
    maxDefault,
    projectSizes,
    setMinSize,
    setMaxSize,
    setFiltersApplied,
  ]);

  projectSizes.forEach(value => {
    const binIndex = Math.min(
      Math.floor((value - minSize) / binSize),
      numBins - 1,
    );
    bins[binIndex]++;
  });

  const chartData = bins.map((count, index) => {
    const binStart = minSize + index * binSize;
    const binEnd = binStart + binSize;
    const fill =
      binStart >= minDefault && binEnd <= maxDefault
        ? COLORS.electricBlue
        : COLORS.electricBlue40;

    return {
      name: `${Math.round(binStart)} - ${Math.round(binEnd)}`,
      count,
      fill,
    };
  });

  return (
    <div>
      <HistogramContainer>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={chartData}
            margin={{ top: -30, right: 50, left: 50, bottom: 5 }}
          >
            <Bar
              dataKey="count"
              fill={COLORS.electricBlue}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </HistogramContainer>

      <ProjectSizeSlider
        setMinDefault={setMinDefault}
        setMaxDefault={setMaxDefault}
        minSize={minSize}
        minDefault={minDefault}
        maxDefault={maxDefault}
        minBound={minBound}
        maxBound={maxBound}
        setSelectedSize={setSelectedSize}
      />
    </div>
  );
}
