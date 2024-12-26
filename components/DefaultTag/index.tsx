import {
  LastUpdatedIcon,
  ProjectSizeIcon,
  UtilityIcon,
} from '@/assets/Project-Modal-Tag-Icons/icons';
import COLORS from '@/styles/colors';
import { TagText1 } from '../../styles/texts';
import { DefaultTagStyles } from './styles';

export default function DefaultTag({
  content,
  icon_category,
  size,
}: {
  content: string | undefined;
  icon_category: string;
  size: number | undefined;
}) {
  const categories: { [key: string]: JSX.Element } = {
    'Utility Service Territory': <UtilityIcon />,
    'Project Size': <ProjectSizeIcon />,
    'Last Updated': <LastUpdatedIcon />,
  };

  const utility_territories: { [key: string]: string } = {
    NGRID: 'National Grid',
    'RG&E': ' Rochester Gas & Electric',
    NYSEG: 'NYS Electric & Gas',
    'CHG&E': 'Central Hudson Gas & Electric',
    ORU: 'Orange & Rockland Utilities',
    LIPA: 'Long Island Power Authority',
    ConEd: 'Consolidated Edison',
  };

  const icon = icon_category ? categories[icon_category] : null;

  const getProjectScale = () => {
    if (!size) {
      return null;
    }
    if (size <= 5) {
      return 'Community Scale';
    } else if (size >= 25) {
      return 'Utility Scale';
    } else {
      return null;
    }
  };

  const getContent = () => {
    if (icon_category === 'Utility Service Territory') {
      return (
        <DefaultTagStyles>
          {icon}{' '}
          <TagText1 $color={COLORS.electricBlue}>
            {content ? utility_territories[content] : null}
          </TagText1>
        </DefaultTagStyles>
      );
    }
    if (icon_category === 'Project Size') {
      const scale = getProjectScale();
      return scale ? (
        <DefaultTagStyles>
          {icon} <TagText1 $color={COLORS.electricBlue}>{scale}</TagText1>
        </DefaultTagStyles>
      ) : null;
    }
    return (
      <DefaultTagStyles>
        {icon} <TagText1 $color={COLORS.electricBlue}>{content}</TagText1>
      </DefaultTagStyles>
    );
  };

  return <div>{icon && getContent()}</div>;
}
