import { InfoModalIcon } from '@/assets/InfoModal-Icons/icons';
import InfoModal from '../InfoModal';
import { InfoModalButtonBackground } from './styles';

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
      </InfoModalButtonBackground>
    </>
  );
}
