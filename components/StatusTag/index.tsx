import {
  CalendarIcon,
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '../../assets/Status-Tag-Icons/icons';
import { InfoHoverText, TagText1 } from '../../styles/texts';
import {
  AllTagStyles,
  CODInfoHoverContainer,
  CODInfoText,
  CODTagStyles,
  ProposedCODTagStyles,
  StatusTagStyles,
} from './styles';

export default function StatusTag({
  projectStatus,
  cod,
}: {
  projectStatus: string | undefined;
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

  if (projectStatus === 'Operational') {
    return (
      <StatusTagStyles>
        <GreenDotOperationalIcon /> <TagText1>Operational</TagText1>
      </StatusTagStyles>
    );
  }

  if (projectStatus === 'Proposed') {
    return cod ? (
      <AllTagStyles>
        <ProposedCODTagStyles>
          <GreyDotInProgressIcon /> <TagText1>Proposed</TagText1>
        </ProposedCODTagStyles>
        <CODTagStyles>
          <CODInfoHoverContainer>
            <CODInfoText>
              <InfoHoverText>
                COD stands for Commercial Operations Date. It is the predicted
                date that this project will begin to produce electricity.
              </InfoHoverText>
            </CODInfoText>
            <CalendarIcon />
            <TagText1>COD {convertDateToString()}</TagText1>
          </CODInfoHoverContainer>
        </CODTagStyles>
      </AllTagStyles>
    ) : (
      <StatusTagStyles>
        <GreyDotInProgressIcon /> <TagText1>Proposed</TagText1>
      </StatusTagStyles>
    );
  }

  return null;
}
