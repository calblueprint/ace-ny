import {
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '../../assets/Status-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';
import { StatusTagStyles } from './styles';

export default function StatusTag({
  projectStatus,
  cod,
}: {
  projectStatus: string | undefined;
  cod: string | null;
}) {
  return (
    <div>
      {projectStatus === 'Operational' && (
        <StatusTagStyles>
          <GreenDotOperationalIcon /> <TagText1>Operational</TagText1>
        </StatusTagStyles>
      )}
      {projectStatus === 'Proposed' && (
        <StatusTagStyles>
          <GreyDotInProgressIcon /> <TagText1>Proposed {cod}</TagText1>
        </StatusTagStyles>
      )}
    </div>
  );
}
