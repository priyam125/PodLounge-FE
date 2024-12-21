const EmailIcon = ({ width = 30, height = 24, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0ZM27 21H3V6L15 13.5L27 6V21ZM15 10.5L3 3H27L15 10.5Z"
        fill="white"
      />
    </svg>
  );
};

export default EmailIcon;