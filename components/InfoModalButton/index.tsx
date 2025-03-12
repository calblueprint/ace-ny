import { useState } from 'react';
import { InfoModalIcon } from '@/assets/InfoModal-Icons/icons';
import InfoModal from '../InfoModal';
import { InfoModalButtonBackground } from './styles';

export default function InfoModalButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {isVisible && <InfoModal />}
      <InfoModalButtonBackground onClick={() => setIsVisible(!isVisible)}>
        <InfoModalIcon />
      </InfoModalButtonBackground>
    </>
  );
}
