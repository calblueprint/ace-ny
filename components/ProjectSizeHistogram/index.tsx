import React, { useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import COLORS from '@/styles/colors';
import { ProjectSizeType } from '@/types/schema';
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
  setSelectedSize: (args: { value: ProjectSizeType; isTemp: boolean }) => void;
  minBound: number;
  maxBound: number;
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
}: HistogramProps) {
  const numBins = 10;

  const logProjectSizes = projectSizes.map(x => Math.log10(x + 1));
  const logMinSize = Math.min(...logProjectSizes);
  const logMaxSize = Math.max(...logProjectSizes);
  const logBinSize = (logMaxSize - logMinSize) / numBins;

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

      const value = {
        min: Math.max(0, minSize),
        max: Math.max(minSize, maxSize),
      };
      setSelectedSize({ value: value, isTemp: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDefault, maxDefault, projectSizes, setMinSize, setMaxSize]);

  if (logProjectSizes.length === 1) {
    bins[0] = 1;
  } else {
    logProjectSizes.forEach(value => {
      const binIndex = Math.min(
        Math.floor((value - logMinSize) / logBinSize),
        numBins - 1,
      );
      bins[binIndex]++;
    });
  }

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
        minDefault={minDefault}
        maxDefault={maxDefault}
        minBound={minBound}
        maxBound={maxBound}
      />
    </div>
  );
}
