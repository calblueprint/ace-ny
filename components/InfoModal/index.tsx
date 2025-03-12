import { InfoModalTriangle } from '@/assets/InfoModal-Icons/icons';
import {
  InfoModalStyles,
  InfoModalText,
  InfoModalTriangleStyles,
} from './styles';

export default function InfoModal() {
  const text =
    "This map was created by the Alliance for Clean Energy New York to showcase the renewable energy projects being proposed, constructed, and operated across New York. The Alliance for Clean Energy New York has compiled this map from various public sources and updates it regularly. We make our best effort to ensure that all information is accurate and up to date, but it's possible that some of the information is inaccurate. If you notice a discrepancy, please email us at map@aceny.org, and we will check the information. This map is for informational use only.";
  return (
    <>
      <InfoModalStyles>
        <InfoModalText>{text}</InfoModalText>
      </InfoModalStyles>
      <InfoModalTriangleStyles>
        <InfoModalTriangle />
      </InfoModalTriangleStyles>
    </>
  );
}
