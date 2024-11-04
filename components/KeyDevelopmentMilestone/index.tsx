import { CheckmarkIcon, DotDotDotIcon } from '../../assets/KDM-Icons/icons';
import { Milestone, MilestoneLabel } from './styles';

export default function KeyDevelopmentMilestone({
  completed,
  date,
  index,
}: {
  completed: boolean;
  date: string | null;
  index: number;
}) {
  let statusLabel = '';
  const milestoneLabels = [
    'NYISO queue entered',
    'ORES permit applied',
    'ORES permit issued',
    'NYSERDA contracted',
    'IA executed',
    'Operations begun',
  ];

  // Sets status label to date of completion or 'Pending' if incomplete
  if (date) {
    const year = date.slice(2, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    statusLabel = `${month}.${day}.${year}`;
  } else {
    statusLabel = 'Pending';
  }

  return (
    <Milestone completed={completed}>
      {milestoneLabels[index]}
      <MilestoneLabel status={completed}>
        {completed ? <CheckmarkIcon /> : <DotDotDotIcon />}
        {statusLabel}
      </MilestoneLabel>
    </Milestone>
  );
}
