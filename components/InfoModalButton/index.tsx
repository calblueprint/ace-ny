import { InfoModalIcon } from '@/assets/InfoModal-Icons/icons';
import COLORS from '@/styles/colors';
import { TagText1 } from '../../styles/texts';
import InfoModal from '../InfoModal';
import { InfoHoverText, InfoModalButtonBackground } from './styles';

interface InfoModalButtonProps {
  aggFilterisVisible: boolean;
  setAggFilterisVisible: (isVisible: boolean) => void;
  infoModalisVisible: boolean;
  setInfoModalisVisible: (isVisible: boolean) => void;
  legendIsVisible: boolean;
  setLegendIsVisible: (isVisible: boolean) => void;
}

export default function InfoModalButton({
  aggFilterisVisible,
  setAggFilterisVisible,
  infoModalisVisible,
  setInfoModalisVisible,
  legendIsVisible,
  setLegendIsVisible,
}: InfoModalButtonProps) {
  function handleClick() {
    setInfoModalisVisible(!infoModalisVisible);
    if (aggFilterisVisible) {
      setAggFilterisVisible(false);
    }
    if (legendIsVisible) {
      setLegendIsVisible(false);
    }
  }

  return (
    <>
      {infoModalisVisible && <InfoModal />}
      <InfoModalButtonBackground onClick={handleClick}>
        <InfoModalIcon />
        {!infoModalisVisible && (
          <InfoHoverText>
            <TagText1 $color={COLORS.navy75}>
              Learn more about this map, how it was created, and how to report
              updates or corrections.
            </TagText1>
          </InfoHoverText>
        )}
      </InfoModalButtonBackground>
    </>
  );
}
