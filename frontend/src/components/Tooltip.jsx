const Tooltip = ({ content, ariaId }) => {
  return (
    <div
      role="tooltip"
      id={ariaId}
      className="group-hover/tooltip:opacity-100 transition-opacity bg-gray-800 p-1 text-xs text-center text-gray-100 rounded-md absolute left-1/2 
-translate-x-1/2 opacity-0 m-1 mx-auto w-fit whitespace-nowrap"
    >
      {content}
    </div>
  );
};

export default Tooltip;
