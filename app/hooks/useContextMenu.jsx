const useContextMenu = (contextMenu, setContextMenu) => {
  const handleRightClick = (e) => {
    e.preventDefault();

    let X = e.pageX;
    let Y = e.pageY;
    let winWidth = window.innerWidth;
    // let cmWidth = contextMenuRef.current.offsetWidth;
    let cmWidth = 230;
    let winHeight = window.innerHeight;
    // let cmHeight = contextMenuRef.current.offsetHeight;
    let cmHeight = 100;
    X = X > winWidth - cmWidth ? winWidth - cmWidth : X;
    Y = Y > winHeight - cmHeight ? winHeight - cmHeight : Y;

    setContextMenu({ ...contextMenu, show: true, x: X, y: Y });
  };

  const closeContextMenu = (event) => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  return { handleRightClick, closeContextMenu };
};

export default useContextMenu;
