import {
  CalendarIcon,
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '../../assets/Status-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';
import { AllTagStyles, CODTagStyles, StatusTagStyles } from './styles';

export default function StatusTag({
  projectStatus,
  cod,
}: {
  projectStatus: string | undefined;
  cod: Date | undefined;
}) {
  function convertDateToString() {
    if (!cod) {
      return '';
    }
    const res: Date = new Date(cod);
    const year = String(res.getFullYear()).slice(-2);
    const month = String(res.getMonth() + 1).padStart(2, '0');
    const day = String(res.getDate()).padStart(2, '0');
    return `${month}.${day}.${year}`;
  }

  return (
    <div>
      {projectStatus === 'Operational' && (
        <StatusTagStyles>
          <GreenDotOperationalIcon /> <TagText1>Operational</TagText1>
        </StatusTagStyles>
      )}
      {projectStatus === 'Proposed' && (
        <AllTagStyles>
          <StatusTagStyles>
            <GreyDotInProgressIcon /> <TagText1>Proposed</TagText1>
          </StatusTagStyles>
          <CODTagStyles>
            <CalendarIcon />
            <TagText1>COD {convertDateToString()}</TagText1>
          </CODTagStyles>
        </AllTagStyles>
      )}
    </div>
  );
}
