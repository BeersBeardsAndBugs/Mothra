import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

const myModalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export const NewBugModal = ({ isNewBugModalOpen, handleNewBugModalClose }) => {
    const classes = useStyles()
    const [modalStyle] = React.useState(myModalStyle)

    const NewBug = (
        <div style={modalStyle} className={classes.paper}>
            this is a new bug
        </div>
    )

    return (
        <div>
            <Modal
                open={isNewBugModalOpen}
                onClose={handleNewBugModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {NewBug}
            </Modal>
        </div>
    )
}
