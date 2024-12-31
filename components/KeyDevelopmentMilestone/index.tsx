import { CheckmarkIcon, DotDotDotIcon } from '../../assets/KDM-Icons/icons';
import { Milestone, MilestoneLabel, MilestoneTitle } from './styles';

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
    'IA tendered',
    'Operations begun',
  ];
  function getDate() {
    if (!date) return null;
    const res = new Date(date);
    return res;
  }
  // Sets status label to date of completion or 'Pending' if incomplete
  if (milestoneLabels[index] === 'NYSERDA contracted' && date) {
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

  return (
    <Milestone completed={completed}>
      <MilestoneTitle>
        {milestoneLabels[index]}
        {completed ? (
          <CheckmarkIcon width={'9'} height={'8'} />
        ) : (
          <DotDotDotIcon />
        )}
      </MilestoneTitle>
      <MilestoneLabel status={completed}>{statusLabel}</MilestoneLabel>
    </Milestone>
  );
}
