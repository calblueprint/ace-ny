import React from 'react';
import { LegendButtonIcon } from '@/assets/Legend-Icons/icons';
import Legend from '../Legend';
import { LegendButtonBackground, LegendButtonWhiteBackground } from './styles';

interface InfoModalButtonProps {
  aggFilterisVisible: boolean;
  setAggFilterisVisible: (isVisible: boolean) => void;
  infoModalisVisible: boolean;
  setInfoModalisVisible: (isVisible: boolean) => void;
  legendIsVisible: boolean;
  setLegendIsVisible: (isVisible: boolean) => void;
}

export default function LegendButton({
  aggFilterisVisible,
  setAggFilterisVisible,
  infoModalisVisible,
  setInfoModalisVisible,
  legendIsVisible,
  setLegendIsVisible,
}: InfoModalButtonProps) {
  function handleClick() {
    setLegendIsVisible(!legendIsVisible);
    if (aggFilterisVisible) {
      setAggFilterisVisible(false);
    }
    if (infoModalisVisible) {
      setInfoModalisVisible(false);
    }
  }

  return (
    <>
      {legendIsVisible && <Legend />}
      <LegendButtonBackground onClick={handleClick}>
        <LegendButtonWhiteBackground>
          <LegendButtonIcon />
        </LegendButtonWhiteBackground>
      </LegendButtonBackground>
    </>
  );
}
