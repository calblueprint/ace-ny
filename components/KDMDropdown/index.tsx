import { CheckmarkIcon, CloseIcon, OpenIcon } from '@/assets/KDM-Icons/icons';
import { SubHeading2, TagText2 } from '@/styles/texts';
import { Milestone } from '@/types/schema';
import KeyDevelopmentMilestone from '../KeyDevelopmentMilestone';
import {
  CompletionIndicatorTag,
  Header,
  KDMContainer,
  ProgressBar,
  ProgressBox,
} from './styles';

export default function KDMDropdown({
  key_development_milestones,
  isOpen,
  setIsOpen,
}: {
  key_development_milestones: Milestone[] | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Map KDMs
  const KDMs = key_development_milestones?.map(
    (milestone: Milestone, i: number) => {
      return (
        <KeyDevelopmentMilestone
          key={i}
          index={i}
          completed={milestone.completed}
          date={milestone.date}
        ></KeyDevelopmentMilestone>
      );
    },
  );

  const totalCompletedKDMs = key_development_milestones
    ? Object.values(key_development_milestones).reduce(
        (a, item) => a + (item.completed === true ? 1 : 0),
        0,
      )
    : 0;

  const ProgressBarContent = key_development_milestones?.map(
    (milestone: Milestone, i: number) => {
      return (
        <ProgressBox key={i} $completed={milestone.completed}></ProgressBox>
      );
    },
  );

  const toggleKDM = () => {
    setIsOpen(!isOpen);
  };

  return (
    <KDMContainer>
      <Header onClick={toggleKDM}>
        <SubHeading2>KEY DEVELOPMENT MILESTONES</SubHeading2>
        <CompletionIndicatorTag>
          <CheckmarkIcon width={'8'} height={'7'} />
          <TagText2>{totalCompletedKDMs}/6</TagText2>
        </CompletionIndicatorTag>
        {isOpen ? <CloseIcon /> : <OpenIcon />}
      </Header>
      {isOpen ? KDMs : <ProgressBar>{ProgressBarContent}</ProgressBar>}
    </KDMContainer>
  );
}
