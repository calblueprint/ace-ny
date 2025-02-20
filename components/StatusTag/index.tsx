import COLORS from '@/styles/colors';
import {
  CalendarIcon,
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '../../assets/Status-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';
import {
  AllTagStyles,
  CODTagStyles,
  InfoHoverContainer,
  InfoHoverText,
  TagStyle,
} from './styles';

const statusDetails = {
  Operational: {
    icon: <GreenDotOperationalIcon />,
    color: COLORS.aceGreen,
    info: 'The project has been built and delivers power to the NYS grid.',
  },
  Proposed: {
    icon: <GreyDotInProgressIcon />,
    color: COLORS.ashGrey,
    info: 'The project is still in the planning stages and has not begun delivering power.',
  },
};

type ProjectStatus = keyof typeof statusDetails | string;

export default function StatusTag({
  projectStatus,
  cod,
}: {
  projectStatus: ProjectStatus;
  cod: Date | undefined;
}) {
  function convertDateToString() {
    if (!cod) return '';
    const res = new Date(cod);
    const year = String(res.getFullYear()).slice(-2);
    const month = String(res.getMonth() + 1).padStart(2, '0');
    const day = String(res.getDate()).padStart(2, '0');
    return `${month}.${day}.${year}`;
  }

  // Use a default fallback status for unknown statuses
  const status = statusDetails[projectStatus as keyof typeof statusDetails] || {
    icon: null,
    color: COLORS.grey, // Fallback color
    info: 'Status information unavailable.',
  };

  return (
    <div>
      <AllTagStyles>
        <TagStyle $color={status.color}>
          <InfoHoverContainer>
            {status.icon}
            <TagText1 $color={status.color}>{projectStatus}</TagText1>
            <InfoHoverText>
              <TagText1 $color={COLORS.navy}>{status.info}</TagText1>
            </InfoHoverText>
          </InfoHoverContainer>
        </TagStyle>

        {cod && (
          <CODTagStyles>
            <InfoHoverContainer>
              <InfoHoverText>
                <TagText1 $color={COLORS.navy}>
                  The date on which the project begins delivering power.
                </TagText1>
              </InfoHoverText>
              <CalendarIcon />
              <TagText1 $color={COLORS.electricBlue}>
                COD {convertDateToString()}
              </TagText1>
            </InfoHoverContainer>
          </CODTagStyles>
        )}
      </AllTagStyles>
    </div>
  );
}
