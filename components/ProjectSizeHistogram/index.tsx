import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import COLORS from '@/styles/colors';
import ProjectSizeSlider from '../ProjectSizeSlider';

interface HistogramProps {
  data: number[];
}

export default function ProjectSizeHistogram({ data }: HistogramProps) {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);

  const numBins = 10;
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const binSize = (maxValue - minValue) / numBins;
  const bins = Array(numBins).fill(0);

  data.forEach(value => {
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

      <ProjectSizeSlider
        setMinRange={setMinRange}
        setMaxRange={setMaxRange}
        maxValue={maxValue}
      />
    </div>
  );
}
