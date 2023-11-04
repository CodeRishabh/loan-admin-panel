import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkCircleFill from '@iconify/icons-eva/checkmark-circle-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Button, Modal, Typography, Box, Dialog, AppBar, Toolbar, List, ListItem, Divider, Slide } from '@mui/material';
import { MdOutlineClose } from 'react-icons/md'
import { approved, fetchById, updateApproval } from '../../../api'
import DetailView from './DetailedView';
import { useDispatch } from 'react-redux';
import { setApproval } from '../../../store/actions';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const modalStyle1 = {
  position: 'absolute',
  top: '0%',
  left: '0%',
  overflow: 'scroll',
  height: '100%',
  display: 'block'
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    userId: props.requestDetails._id,
    approval: true
  })
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleApprove = () => {
    setIsOpen(false)
    updateApproval(data).then((res) => {
      dispatch(setApproval(props.requestDetails._id))
    })
  }

  const handleView = async () => {
    setIsOpen(false)
    handleOpen()
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleApprove}>
          <ListItemIcon>
            <Icon icon={checkmarkCircleFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleView}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View More" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <MdOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detailed View
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <DetailView
          details={props.requestDetails}
        />
      </Dialog>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyle1}
      >
        <Box sx={style}>
        </Box>
      </Modal> */}
    </>
  );
}
