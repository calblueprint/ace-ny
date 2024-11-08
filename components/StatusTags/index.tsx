import {
  CalendarIcon,
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '../../assets/Status-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';

export default function StatusTags({
  projectStatus,
  cod,
}: {
  projectStatus: string | undefined;
  cod: string | null;
}) {
  return <TagText1>{projectStatus}</TagText1>;
}
