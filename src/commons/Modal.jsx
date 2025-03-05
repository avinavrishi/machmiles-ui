import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalComponent = ({ open, handleClose, hideClose, title, children }) => {
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 'auto',
                    height: 'auto',
                    bgcolor: "#0e367e",
                      boxShadow: 24,
                    p: 1,
                    borderRadius: 5,
                    // overflow:'scroll'
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography 
                // sx={{ mt: 2 }}
                >{children}</Typography>
                {!hideClose &&
                    <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                        Close
                    </Button>
                }
            </Box>
        </Modal>
    );
};

export default ModalComponent;
