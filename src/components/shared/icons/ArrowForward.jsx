/* eslint-disable react/prop-types */
const ArrowForward = ({ width = 20, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5_6)">
        <path
          d="M10 3.33334L8.825 4.50834L13.475 9.16667H3.33334V10.8333H13.475L8.825 15.4917L10 16.6667L16.6667 10L10 3.33334Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_6">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowForward;
