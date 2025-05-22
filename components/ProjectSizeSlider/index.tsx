import MultiRangeSlider from 'multi-range-slider-react';
import COLORS from '@/styles/colors';
import './styles.css';

interface ProjectSizeSliderProps {
  setMinDefault: (value: number) => void;
  setMaxDefault: (value: number) => void;
  minDefault: number;
  maxDefault: number;
  minBound: number;
  maxBound: number;
}

export default function ProjectSizeSlider({
  setMinDefault,
  setMaxDefault,
  minDefault,
  maxDefault,
  minBound,
  maxBound,
}: ProjectSizeSliderProps) {
  return (
    <MultiRangeSlider
      onInput={e => {
        setMinDefault(e.minValue);
        setMaxDefault(e.maxValue);
      }}
      onChange={e => {
        setMinDefault(e.minValue);
        setMaxDefault(e.maxValue);
      }}
      label={false}
      ruler={false}
      style={{ border: 'none', boxShadow: 'none', padding: '0 0 10px 0' }}
      barInnerColor={COLORS.electricBlue}
      barLeftColor={COLORS.electricBlue40}
      barRightColor={COLORS.electricBlue40}
      min={minBound}
      max={maxBound}
      minValue={minDefault}
      maxValue={maxDefault}
      canMinMaxValueSame={true}
    ></MultiRangeSlider>
  );
}
