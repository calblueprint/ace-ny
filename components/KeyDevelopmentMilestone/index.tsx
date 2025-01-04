import React from 'react';
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
    'IA tendered',
    'Operations begun',
  ];
  // Abbreviation to full text mapping
  const abbreviationMap: Record<string, string> = {
    NYISO: 'New York Independent System Operator',
    NYSERDA: 'New York State Energy Research and Development Authority',
    IA: 'Interconnection Agreement',
  };

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

  const renderWithTooltip = (text: string) => {
    // Find the abbreviation in the text
    const abbreviation = Object.keys(abbreviationMap).find(abbr =>
      text.includes(abbr),
    );

    // If an abbreviation is found, replace it with a React component (tooltip)
    if (abbreviation) {
      return (
        <KDMInfoHoverContainer>
          {text.split(abbreviation).map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < 1 && ( // Only show the tooltip after the abbreviation
                <>
                  {abbreviation}
                  <KDMInfoText>{abbreviationMap[abbreviation]}</KDMInfoText>
                </>
              )}
            </React.Fragment>
          ))}
        </KDMInfoHoverContainer>
      );
    }

    // If no abbreviation is found, just return the text
    return text;
  };

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
