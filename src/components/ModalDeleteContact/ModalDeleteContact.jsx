import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { closeModal } from "../../redux/modal/slice";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./ModalDeleteContact.module.css";

const ModalDeleteContact = () => {
  const dispatch = useDispatch();
  const { isOpen, contactId } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(deleteContact(contactId));
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className={css.dialog}>
      <div className={css.modal}>
        <DialogTitle className={css.title}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className={css.description}>
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={css.btnContainer}>
          <Button className={css.btn} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={css.btn} onClick={handleConfirm}>
            Delete
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ModalDeleteContact;
