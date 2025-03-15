import React, { useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import COLORS from '@/styles/colors';
import { projectSizeType } from '@/types/schema';
import ProjectSizeSlider from '../ProjectSizeSlider';
import { HistogramContainer } from './styles';

interface HistogramProps {
  projectSizes: number[];
  setMinSize: (value: number) => void;
  setMaxSize: (value: number) => void;
  minRange: number;
  setMinRange: (value: number) => void;
  maxRange: number;
  setMaxRange: (value: number) => void;
  setSelectedSize: (value: projectSizeType) => void;
}

export default function ProjectSizeHistogram({
  projectSizes,
  setMinSize,
  setMaxSize,
  minRange,
  setMinRange,
  maxRange,
  setMaxRange,
  setSelectedSize,
}: HistogramProps) {
  const numBins = 10;
  const minValue = Math.min(...projectSizes);
  const maxValue = Math.max(...projectSizes);
  const binSize = (maxValue - minValue) / numBins;
  const bins = Array(numBins).fill(0);

  useEffect(() => {
    const filteredSizes = projectSizes.filter(
      size =>
        size >= Math.max(0, minRange) && size <= Math.max(minValue, maxRange),
    );

    if (filteredSizes && filteredSizes.length > 0) {
      const minSize = Math.min(...filteredSizes);
      const maxSize = Math.max(...filteredSizes);
      setMinSize(minSize);
      setMaxSize(maxSize);
    }
  }, [minRange, maxRange, projectSizes, minValue, setMinSize, setMaxSize]);

  projectSizes.forEach(value => {
    const binIndex = Math.min(
      Math.floor((value - minValue) / binSize),
      numBins - 1,
    );
    bins[binIndex]++;
  });

  const chartData = bins.map((count, index) => {
    const binStart = minValue + index * binSize;
    const binEnd = binStart + binSize;
    const fill =
      binStart >= minRange && binEnd <= maxRange
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
        setMinRange={setMinRange}
        setMaxRange={setMaxRange}
        minValue={minValue}
        maxValue={maxValue}
        minRange={minRange}
        maxRange={maxRange}
        setSelectedSize={setSelectedSize}
      />
    </div>
  );
}
