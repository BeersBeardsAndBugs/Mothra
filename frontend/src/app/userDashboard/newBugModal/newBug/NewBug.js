import React from 'react'

export const NewBug = ({ classes }) => {
    const [modalStyle] = React.useState({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    })

    return (
        <div style={modalStyle} className={classes.paper}>
            this is a new bug
        </div>
    )
}
