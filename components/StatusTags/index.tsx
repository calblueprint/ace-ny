import {
  CalendarIcon,
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '../../assets/Status-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';
import { ProjectFilter } from './styles';

export default function StatusTags({
  projectStatus,
  cod,
}: {
  projectStatus: string | undefined;
  cod: string | null;
}) {
  return (
    <div>
      {projectStatus === 'Operational' && (
        <>
          <ProjectFilter>
            <GreenDotOperationalIcon /> <TagText1>Operational</TagText1>
          </ProjectFilter>
        </>
      )}
      {projectStatus === 'Proposed' && (
        <>
          <ProjectFilter>
            <GreyDotInProgressIcon /> <TagText1>Proposed {cod}</TagText1>
          </ProjectFilter>
        </>
      )}
    </div>
  );
}
