"use client";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { modalStyles } from "@/app/styles/modal_styles";
// import { useSelector } from "react-redux";

// import errorImg from "../../assets/error.png";

const ErrorModal = () => {
  // const { error, errorMsg } = useSelector((state) => state.atina);
  let error = false;
  let errorMsg = "";
  const [open, setOpen] = React.useState(error);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    // console.log("error");
    error && handleOpen();
  }, [error]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 0,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyles.errorModal}>
            <Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Fehlermeldung
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {errorMsg}
              </Typography>
            </Box>
            {/* <img
              modalStyles.errorModal={{ width: "10rem", height: "10rem" }}
              alt="error"
              src={errorImg}
            /> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ErrorModal;
