import { useState } from "react";

export const useMenu = (name, menuProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = !!anchorEl;
  const id = name + "-menu";
  const pieces = {
    menuProps,
    containerProps: {
      anchorEl,
      id,
      isMenuOpen,
    },
    id,
    isMenuOpen,
    open: (event) => {
      setAnchorEl(event.currentTarget);
    },
    close: () => setAnchorEl(null),
  };

  return [pieces];
};
