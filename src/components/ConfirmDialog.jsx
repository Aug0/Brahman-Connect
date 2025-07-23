import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  onClose,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmColor = "#d25b2d",
}) => {
   useEffect(() => {   
    try {
      if(open) {
        const audio = new Audio("/audio/alarm-sound.mp3");
        audio.play();
      }else {
        console.warn('Audio playback is blocked by the user.');
      }
    } catch (error) {
      console.warn('Audio playback is blocked by the user.');
    }


  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 2, p: 2 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, color: confirmColor }}>
        {title}
      </DialogTitle>
      <DialogContent className="text-sm text-gray-700">
        {message}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: confirmColor,
            color: confirmColor,
            textTransform: "none",
            ":hover": {
              background: "#fbeae3",
              borderColor: confirmColor,
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            background: confirmColor,
            textTransform: "none",
            ":hover": { background: "#c24f24" },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
