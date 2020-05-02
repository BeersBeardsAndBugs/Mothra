import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react'
import { BugDetail } from './BugDetail'
import { BugList } from './BugList'
import { NavbarContainer } from './navbarContainer'
import { NewBugModal } from './newBugModal'
import { useFetch } from '../../hooks'
import { PATH, BUG } from '../../constants'

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

    const editBugSubmit = (editedBug) => {
        bugs.edit({
            ...editedBug,
            [BUG.ID]: visibleBug.id,
            [BUG.UPDATED_BY]: user.response.email,
        })
    }

    return (
        <Grid container spacing={2} alignItems="flex-start" justify="stretch">
            <Grid item sm={12} xs={12} xl={12}>
                {user.response && (
                    <NavbarContainer
                        {...{
                            user,
                            setPageSelected,
                            handleVisibleBugChange,
                            handleNewBugModalOpen,
                        }}
                    />
                )}
            </Grid>
            <Grid item xs={12} sm={3} xl={2}>
                <BugList
                    {...{
                        bugs,
                        userName: user.response.name,
                        handleVisibleBugChange,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={9} xl={9}>
                {visibleBug?.id && (
                    <BugDetail
                        key={visibleBug.id}
                        {...{
                            userEmail: user.response.email,
                            visibleBug,
                            editBugSubmit,
                        }}
                    />
                )}
            </Grid>
            {isNewBugModalOpen && (
                <NewBugModal
                    {...{ isNewBugModalOpen, handleNewBugModalClose }}
                />
            )}
        </Grid>
    )
}
