import { useRouter } from "next/navigation";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import ESG from "@/lib/esg-helper";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, name } = props;
  const router = useRouter();

  const handleSignOut = async () => {
    ESG.signOut();
    router.push("/login");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline" style={{ fontWeight: "600" }}>
          Account
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          padding: "5px 0px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
