import COLORS from '@/styles/colors';

export const CheckmarkIcon = (props: {
  width: string | undefined;
  height: string | undefined;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 8 7"
    fill="none"
  >
    <path
      d="M7.48145 7H0.481445V6H7.48145V7ZM2.98145 4.71L0.981445 2.71L1.68645 2.005L2.98145 3.295L6.27645 0L6.98145 0.71L2.98145 4.71Z"
      fill={COLORS.electricBlue}
    />
  </svg>
);

export const DotDotDotIcon = () => (
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

export const OpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
  >
    <path
      d="M4.98157 6.16104L9.83813 1.62824L8.69631 0.561035L4.98157 4.0304L1.26763 0.561035L0.125 1.62749L4.98157 6.16104Z"
      fill="#949AA9"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
  >
    <path
      d="M5.00012 0.561011L9.85669 5.09381L8.71487 6.16101L5.00012 2.69165L1.28618 6.16101L0.143555 5.09456L5.00012 0.561011Z"
      fill="#949AA9"
    />
  </svg>
);
