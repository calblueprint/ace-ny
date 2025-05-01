import { LegendButtonIcon } from '@/assets/Legend-Icons/icons';
import COLORS from '@/styles/colors';
import { TagText1 } from '../../styles/texts';
import Legend from '../Legend';
import {
  InfoHoverText,
  LegendButtonBackground,
  LegendButtonWhiteBackground,
} from './styles';

interface LegendButtonProps {
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
}: LegendButtonProps) {
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
        {!legendIsVisible && (
          <InfoHoverText>
            <TagText1 $color={COLORS.navy75}>
              View the map key, which explains the symbols for technology type
              and energy source.
            </TagText1>
          </InfoHoverText>
        )}
      </LegendButtonBackground>
    </>
  );
}
