import { CheckmarkIcon, DotDotDotIcon } from '../../assets/KDM-Icons/icons';
import {
  KDMInfoHoverContainer,
  KDMInfoText,
  Milestone,
  MilestoneLabel,
  MilestoneTitle,
} from './styles';

export default function KeyDevelopmentMilestone({
  completed,
  date,
  index,
}: {
  completed: boolean;
  date: string | null;
  index: number;
}) {
  const milestones = [
    {
      label: 'NYISO queue entered',
      description:
        'This means a project has submitted a formal request to be studied for possible connection to the NYS power grid. Projects may also connect to the grid without this step at a lower voltage.',
    },
    {
      label: 'ORES permit applied',
      description:
        'This means a project has submitted its application to the NY Office of Renewable Energy Siting (ORES) for its primary environmental review.',
    },
    {
      label: 'ORES permit issued',
      description:
        'This means a project has been issued its final permit by the NY Office of Renewable Energy Siting (ORES).',
    },
    {
      label: 'NYSERDA contracted',
      description: 'New York State Energy Research and Development Authority',
    },
    {
      label: 'IA tendered',
      description:
        'This means the project has completed all interconnection studies and has been offered an interconnection contract with the NYS grid.',
    },
    {
      label: 'Operations begun',
      description:
        'The project is operational, delivering power to the NYS grid.',
    },
  ];

  const milestone = milestones[index];
  let statusLabel = '';

  function getDate() {
    if (!date) return null;
    const res = new Date(date);
    return res;
  }
  // Sets status label to date of completion or 'Pending' if incomplete
  if (milestone.label === 'NYSERDA contracted' && date) {
    const date_object = getDate();
    statusLabel = String(date_object?.getFullYear());
  } else if (date) {
    const date_object = getDate();
    if (date_object) {
      const year = String(date_object?.getFullYear()).slice(-2);
      const month = String(1 + date_object?.getMonth()).padStart(2, '0');
      const day = String(date_object?.getDate()).padStart(2, '0');
      statusLabel = `${month}.${day}.${year}`;
    }
  } else if (completed) {
    statusLabel = 'Completed';
  } else {
    statusLabel = 'Pending';
  }

  const renderWithTooltip = (milestone: (typeof milestones)[number]) => {
    const { label, description } = milestone;

    return (
      <span>
        <KDMInfoHoverContainer>
          {label}
          {description && <KDMInfoText>{description}</KDMInfoText>}
        </KDMInfoHoverContainer>
      </span>
    );
  };

  return (
    <Milestone $completed={completed}>
      <MilestoneTitle>
        {renderWithTooltip(milestone)}
        {completed ? (
          <CheckmarkIcon width={'9'} height={'8'} />
        ) : (
          <DotDotDotIcon />
        )}
      </MilestoneTitle>
      <MilestoneLabel $status={completed}>{statusLabel}</MilestoneLabel>
    </Milestone>
  );
}
