export const WorldIcon = (props: { stroke: string | undefined }) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18C10.0506 18 11.0909 17.7931 12.0615 17.391C13.0321 16.989 13.914 16.3997 14.6569 15.6569C15.3997 14.914 15.989 14.0321 16.391 13.0615C16.7931 12.0909 17 11.0506 17 10C17 8.94943 16.7931 7.90914 16.391 6.93853C15.989 5.96793 15.3997 5.08601 14.6569 4.34315C13.914 3.60028 13.0321 3.011 12.0615 2.60896C11.0909 2.20693 10.0506 2 9 2M9 18C7.94943 18 6.90914 17.7931 5.93853 17.391C4.96793 16.989 4.08601 16.3997 3.34315 15.6569C2.60028 14.914 2.011 14.0321 1.60896 13.0615C1.20693 12.0909 1 11.0506 1 10C1 8.94943 1.20693 7.90914 1.60896 6.93853C2.011 5.96793 2.60028 5.08601 3.34315 4.34315C4.08601 3.60028 4.96793 3.011 5.93853 2.60896C6.90914 2.20693 7.94943 2 9 2M9 18C11.4542 18 12.5031 13.4107 12.5031 10C12.5031 6.58933 11.4542 2 9 2M9 18C6.54578 18 5.49689 13.4107 5.49689 10C5.49689 6.58933 6.54578 2 9 2M1.44444 7.33333H16.5556M1.44444 12.6667H16.5556"
        stroke={props.stroke}
        stroke-opacity="0.85"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const LightningIcon = (props: { stroke: string | undefined }) => {
  return (
    <svg
      width="13"
      height="20"
      viewBox="0 0 13 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.21576 10.4252L8.70658 2.03206L7.4908 8.31552L11.5388 9.0527L4.04795 17.4458L5.26373 11.1624L1.21576 10.4252Z"
        stroke={props.stroke}
        stroke-opacity="0.85"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Line = () => {
  return (
    <svg
      width="1"
      height="20"
      viewBox="0 0 1 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.5" x2="0.5" y2="20" stroke="#2E3A59" stroke-opacity="0.075" />
    </svg>
  );
};

export const Arrow = () => {
  return (
    <svg
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M6.76454 0.287647L0.754536 6.29765L2.16754 7.71265L6.76454 3.11265L11.3605 7.71265L12.7745 6.29865L6.76454 0.287647Z"
        fill="#2E3A59"
      />
    </svg>
  );
};

export const DownloadIcon = () => {
  return (
    <svg
      width="7"
      height="10"
      viewBox="0 0 7 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8.73926H6.60889"
        stroke="#949AA9"
        stroke-width="0.701111"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.80438 1.26074V6.86963M3.80438 6.86963L5.44031 5.23371M3.80438 6.86963L2.16846 5.23371"
        stroke="#949AA9"
        stroke-width="0.701111"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
