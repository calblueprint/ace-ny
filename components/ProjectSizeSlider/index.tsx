import MultiRangeSlider from 'multi-range-slider-react';
import COLORS from '@/styles/colors';
import './multirangeslider.css';

interface ProjectSizeSliderProps {
  setMinRange: (value: number) => void;
  setMaxRange: (value: number) => void;
  maxValue: number;
}

export default function ProjectSizeSlider({
  setMinRange,
  setMaxRange,
  maxValue,
}: ProjectSizeSliderProps) {
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
      minValue={-100}
      maxValue={maxValue + 100}
    ></MultiRangeSlider>
  );
}
