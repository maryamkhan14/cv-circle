const MenuBarButton = ({
  onClick: clickHandler,
  className: classes,
  children,
  activeArgs = [],
  editor,
}) => {
  if (!editor) {
    return null;
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        clickHandler();
      }}
      className={`${classes} ${
        editor.isActive(...activeArgs) ? "is-active" : ""
      }  p-1 m-1 bg-gray-200 hover:bg-gray-300 aspect-square w-8 rounded`}
    >
      {[children]}
    </button>
  );
};

export default MenuBarButton;
