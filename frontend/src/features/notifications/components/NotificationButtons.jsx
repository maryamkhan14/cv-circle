const NotificationButtons = ({ setShow }) => {
  return (
    <>
      <button
        type="button"
        className="ml-5 rounded-full bg-blue-800 p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800/80 hover:shadow-lg focus:bg-blue-800/80 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Scroll up to top of page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
          />
        </svg>
      </button>
      <button
        type="button"
        className="ml-5 rounded-full bg-amber-800 p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-amber-800/80 hover:shadow-lg focus:bg-amber-800/80 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg"
        onClick={() => setShow((show) => false)}
        aria-label="Close notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </>
  );
};

export default NotificationButtons;
