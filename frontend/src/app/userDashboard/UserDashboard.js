import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import { BugDetail } from './BugDetail'
import { BugList } from './BugList'
import { NavbarContainer } from './navbarContainer'
import styles from './UserDashboard.module.css'

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

    return (
        <Grid container spacing={2} alignItems="flex-start" justify="stretch">
            <Grid item sm={12} xs={12} xl={12}>
                <NavbarContainer
                    {...{
                        user,
                        setUser,
                        setPageSelected,
                        handleVisibleBugChange,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={3} xl={2}>
                <BugList
                    {...{
                        bugs,
                        setBugs,
                        userName: user.name,
                        handleVisibleBugChange,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={9} xl={9}>
                {visibleBug?.id && (
                    <BugDetail
                        key={visibleBug.id}
                        {...{ visibleBug, userEmail: user.email }}
                    />
                )}
            </Grid>
        </Grid>
    )
}
