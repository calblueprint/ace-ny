import { useEffect } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import COLORS from '@/styles/colors';
import './styles.css';
import { projectSizeType } from '@/types/schema';

interface ProjectSizeSliderProps {
  setMinRange: (value: number) => void;
  setMaxRange: (value: number) => void;
  maxValue: number;
  minRange: number;
  maxRange: number;
  setSelectedSize: (value: projectSizeType) => void;
}

export default function ProjectSizeSlider({
  setMinRange,
  setMaxRange,
  maxValue,
  minRange,
  maxRange,
  setSelectedSize,
}: ProjectSizeSliderProps) {
  useEffect(() => {
    setSelectedSize({ min: minRange, max: maxRange });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minRange, maxRange]);

  return (
    <MultiRangeSlider
      onInput={e => {
        setMinRange(e.minValue);
        setMaxRange(e.maxValue);
      }}
      onChange={e => {
        setMinRange(e.minValue);
        setMaxRange(e.maxValue);
      }}
      label={false}
      ruler={false}
      style={{ border: 'none', boxShadow: 'none', padding: '0 0 10px 0' }}
      barInnerColor={COLORS.electricBlue}
      barLeftColor={COLORS.electricBlue40}
      barRightColor={COLORS.electricBlue40}
      min={-150}
      max={maxValue + 150}
      minValue={minRange}
      maxValue={maxRange}
    ></MultiRangeSlider>
  );
}
