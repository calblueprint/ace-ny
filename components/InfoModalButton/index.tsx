import { InfoModalIcon } from '@/assets/InfoModal-Icons/icons';
import InfoModal from '../InfoModal';
import { InfoModalButtonBackground } from './styles';

interface InfoModalButtonProps {
  infoModalisVisible: boolean;
  setInfoModalisVisible: (isVisible: boolean) => void;
  aggFilterisVisible: boolean;
  setAggFilterisVisible: (isVisible: boolean) => void;
}

export default function InfoModalButton({
  infoModalisVisible,
  setInfoModalisVisible,
  aggFilterisVisible,
  setAggFilterisVisible,
}: InfoModalButtonProps) {
  function handleClick() {
    setInfoModalisVisible(!infoModalisVisible);
    if (aggFilterisVisible) {
      setAggFilterisVisible(false);
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
