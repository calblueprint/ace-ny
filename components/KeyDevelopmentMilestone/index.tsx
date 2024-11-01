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
  let icon = <></>;
  let statusLabel = '';
  const milestoneLabels = [
    'NYISO queue entered',
    'ORES permit applied',
    'ORES permit issued',
    'NYSERDA contracted',
    'IA executed',
    'Operations begun',
  ];

  if (date) {
    const year = date.slice(2, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    statusLabel = `${month}.${day}.${year}`;
  } else {
    statusLabel = 'Pending';
  }

  if (completed) {
    // Completed Icon
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="7"
        viewBox="0 0 8 7"
        fill="none"
      >
        <path
          d="M7.66153 7H0.769226V6H7.66153V7ZM3.23076 4.71L1.26153 2.71L1.95569 2.005L3.23076 3.295L6.47507 0L7.16923 0.71L3.23076 4.71Z"
          fill="#ABBFF0"
        />
      </svg>
    );
  } else {
    // Incomplete Icon
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="2"
        viewBox="0 0 7 2"
        fill="none"
      >
        <path
          d="M5.92308 1.5C5.51523 1.5 5.18461 1.16421 5.18461 0.75C5.18461 0.335786 5.51523 0 5.92308 0C6.33092 0 6.66154 0.335786 6.66154 0.75C6.66154 0.948912 6.58374 1.13968 6.44525 1.28033C6.30676 1.42098 6.11893 1.5 5.92308 1.5ZM3.70769 1.5C3.29985 1.5 2.96923 1.16421 2.96923 0.75C2.96923 0.335786 3.29985 0 3.70769 0C4.11553 0 4.44615 0.335786 4.44615 0.75C4.44615 0.948912 4.36835 1.13968 4.22986 1.28033C4.09137 1.42098 3.90354 1.5 3.70769 1.5ZM1.49231 1.5C1.08447 1.5 0.753845 1.16421 0.753845 0.75C0.753845 0.335786 1.08447 0 1.49231 0C1.90015 0 2.23077 0.335786 2.23077 0.75C2.23077 0.948912 2.15297 1.13968 2.01448 1.28033C1.87599 1.42098 1.68816 1.5 1.49231 1.5Z"
          fill="#DDE0E5"
        />
      </svg>
    );
  }

  return (
    <Milestone completed={completed}>
      {milestoneLabels[index]}
      <MilestoneLabel status={completed}>
        {icon}
        {statusLabel}
      </MilestoneLabel>
    </Milestone>
  );
}
