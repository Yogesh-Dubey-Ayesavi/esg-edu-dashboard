import { Avatar } from "@mui/material";
import { usePopover } from "../hooks/use-popover";
import { AccountPopover } from "./account-popover";

export const NavAvatar = (props) => {
  const accountPopover = usePopover();

  return (
    <>
      <Avatar
        onClick={accountPopover.handleOpen}
        ref={accountPopover.anchorRef}
        sx={{
          cursor: "pointer",
          height: 40,
          width: 40,
        }}
        src="https://static.vecteezy.com/system/resources/previews/001/546/003/non_2x/indian-woman-s-face-avatar-free-vector.jpg"
      />

      <AccountPopover anchorEl={accountPopover.anchorRef.current} open={accountPopover.open} onClose={accountPopover.handleClose} />
    </>
  );
};
