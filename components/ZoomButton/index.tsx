import { ZoomLineIcon } from '@/assets/Legend-Icons/icons';
import { MinusIcon, PlusIcon } from '@/assets/Zoom-Icons/icons';
import { ZoomButtonStyled, ZoomContainer } from './styles';

export default function ZoomButton({ map }: { map: google.maps.Map | null }) {
  const handleZoomIn = () => {
    if (map) map.setZoom((map.getZoom() ?? 7) + 1);
  };

  const handleZoomOut = () => {
    if (map) map.setZoom((map.getZoom() ?? 7) - 1);
  };
  return (
    <>
      <ZoomContainer>
        <ZoomButtonStyled onClick={handleZoomIn}>
          <PlusIcon />
        </ZoomButtonStyled>
        <ZoomLineIcon />
        <ZoomButtonStyled onClick={handleZoomOut}>
          <MinusIcon />
        </ZoomButtonStyled>
      </ZoomContainer>
    </>
  );
}
