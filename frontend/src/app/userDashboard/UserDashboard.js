import React, { useState } from 'react'
import styles from './UserDashboard.module.css'
import { BugDetail } from './BugView/BugDetail'
import { BugList } from './BugList'
import { NavbarContainer } from './navbarContainer'

export const UserDashboard = ({ user, setUser, setPageSelected }) => {
    const [bugs, setBugs] = useState([])
    const [visibleBug, setVisibleBug] = useState({})

    const handleVisibleBugChange = (bugId) => {
        const foundBugs = bugs.filter((bug) => bug.id === bugId)
        if (foundBugs.length === 1) {
            setVisibleBug((prevState) => ({
                ...prevState,
                ...foundBugs[0],
            }))
        }
    }

    return (
        <div className={styles.userDashboard}>
            <NavbarContainer
                {...{ user, setUser, setPageSelected, handleVisibleBugChange }}
            />
            <div className={styles.buglist}>
                <BugList
                    {...{
                        bugs,
                        setBugs,
                        userName: user.name,
                        handleVisibleBugChange,
                    }}
                />
            </div>
            <div className={styles.bugviews}>
                {visibleBug?.id && (
                    <BugDetail
                        key={visibleBug.id}
                        {...{ visibleBug, userEmail: user.email }}
                    />
                )}
            </div>
        </div>
    )
}
