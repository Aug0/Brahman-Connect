import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const CustomDialog = ({
  open,
  handleClose,
  title,
  content,
  buttonText,
  isError = false,
  redirectLink = "",
}) => {
  const navigate = useNavigate();
  
  const redirectPage = () => {
    handleClose();
    navigate(redirectLink);
  };
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
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "15px",
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
           minWidth:"28%"
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {isError ? (
        <ErrorIcon
          sx={{
            color: "red",
            fontSize: 100,
            marginTop: "30px",
            marginBottom: "-10px",
          }}
        />
      ) : (
        <CheckCircleIcon
          sx={{
            color: "green",
            fontSize: 100,
            marginTop: "30px",
            marginBottom: "-10px",
          }}
        />
      )}

      <DialogTitle sx={{ color: isError ? "red" : "green" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center",overflowWrap: 'anywhere' }}>
          <Box
              dangerouslySetInnerHTML={{ __html: content }}
            ></Box>

        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", width: "70%" }}>
        {buttonText && (
          <Button
            onClick={redirectLink ? redirectPage : handleClose}
            color="primary"
            sx={{
              textTransform: "none",
              marginBottom: "30px",
              marginTop: "-15px",
            }}
          >
            {buttonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
