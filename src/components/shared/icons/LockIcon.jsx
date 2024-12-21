const LockIcon = ({ width = 23, height = 29, className="" }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 23 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4241 0C6.57056 0 2.63623 3.93433 2.63623 8.78788V17.5758H6.15138V8.78788C6.15138 5.87645 8.51181 3.51515 11.4241 3.51515C14.3364 3.51515 16.6968 5.87645 16.6968 8.78788V17.5758H20.212V8.78788C20.212 3.93433 16.2777 0 11.4241 0Z"
        fill="#AAB8C2"
      />
      <path
        d="M22.8485 25.4848C22.8485 27.4261 21.2746 29 19.3333 29H3.51515C1.57391 29 0 27.4261 0 25.4848V14.9394C0 12.9981 1.57391 11.4242 3.51515 11.4242H19.3333C21.2746 11.4242 22.8485 12.9981 22.8485 14.9394V25.4848Z"
        fill="#FFAC33"
      />
    </svg>
  );
};

export default LockIcon;