import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react'
import { BugDetail } from './BugDetail'
import { BugList } from './BugList'
import { NavbarContainer } from './navbarContainer'
import { NewBugModal } from './newBugModal'
import styles from './UserDashboard.module.css'
import { PATH } from '../../constants'
import { useFetch } from '../../hooks'

export const UserDashboard = ({ user, setPageSelected }) => {
    const [bugs] = useFetch(PATH.BUG, [])
    const [visibleBug, setVisibleBug] = useState({})
    const [isNewBugModalOpen, setIsNewBugModalOpen] = React.useState(false)

    useEffect(() => {
        bugs.getAll()
    }, [])

    const handleVisibleBugChange = (bugId) => {
        const foundBugs = bugs.response.filter((bug) => bug.id === bugId)
        if (foundBugs.length === 1) {
            setVisibleBug((prevState) => ({
                ...prevState,
                ...foundBugs[0],
            }))
        }
    }

    const handleNewBugModalOpen = () => {
        setIsNewBugModalOpen(true)
    }

    const handleNewBugModalClose = () => {
        setIsNewBugModalOpen(false)
    }

    return (
        <Grid container spacing={1} alignItems="center" justify="center">
            <Grid container item xs={12}>
                <NavbarContainer
                    {...{
                        user,
                        setPageSelected,
                        handleVisibleBugChange,
                        handleNewBugModalOpen,
                    }}
                />
            </Grid>
            <Grid container item xs={3} className={styles.buglist}>
                {bugs?.response && (
                    <BugList
                        {...{
                            bugs: bugs,
                            userName: user.response.name,
                            handleVisibleBugChange,
                        }}
                    />
                )}
            </Grid>
            <Grid container item xs={9} className={styles.bugviews}>
                {visibleBug?.id && (
                    <BugDetail
                        key={visibleBug.id}
                        {...{ visibleBug, userEmail: user.response.email }}
                    />
                )}
            </Grid>
            <NewBugModal {...{ isNewBugModalOpen, handleNewBugModalClose }} />
        </Grid>
    )
}
