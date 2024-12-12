import styled from 'styled-components';

const BaseTagStyles = styled.div`
  border-radius: 6.25rem;
  border: 0.031rem solid rgba(46, 58, 89, 0.25);
  display: inline-flex;
  height: 1.375rem;
  padding: 0.1rem 0.625rem;
  align-items: center;
  flex-direction: row;
  gap: 0.25rem;
`;

export const StatusTagStyles = styled(BaseTagStyles)``;

export const ProposedCODTagStyles = styled(BaseTagStyles)`
  border-left: none;
  border-top: none;
  border-bottom: none;
`;

export const CODTagStyles = styled.div`
  display: inline-flex;
  height: 1.375rem;
  align-items: center;
  flex-direction: row;
  gap: 0.25rem;
  white-space: nowrap;
`;

export const AllTagStyles = styled(BaseTagStyles)`
  padding-left: 0rem;
  gap: 0.375rem;
`;

export const CODInfoHoverContainer = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.25rem;
  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

export const CODInfoText = styled.div`
  visibility: hidden;
  width: 11.25rem;
  background-color: white;
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.75rem;
  position: absolute;
  bottom: 130%;
  white-space: normal;
  box-shadow:
    0rem 1rem 1.25rem 0rem rgba(46, 58, 89, 0.1),
    0rem 0.0625rem 0.0625rem 0rem rgba(46, 58, 89, 0.15);

  /* Tooltip arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0.625rem;
    border-width: 0.313rem;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;
