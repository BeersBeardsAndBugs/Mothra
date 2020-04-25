import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { NewBug } from './newBug'

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

    return (
        <div>
            <Modal
                open={isNewBugModalOpen}
                onClose={handleNewBugModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <NewBug {...{ classes }} />
            </Modal>
        </div>
    )
}
