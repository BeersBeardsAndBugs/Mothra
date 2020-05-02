// User
export const USER = {
    ID: 'id',
    NAME: 'name',
    PASSWORD: 'password',
    EMAIL: 'email',
}
// Bug
export const BUG = {
    ID: 'id',
    TITLE: 'title',
    ASSIGNED_TO: 'assigned_to',
    CREATED_BY: 'creator',
    DESCRIPTION: 'description',
    CREATED_DATE: 'created_date',
    UPDATED_LAST: 'updated_last',
    PRIORITY: 'priority',
    STATUS: 'status',
    UPDATED_BY: 'updated_by',
}

// Comment

export const COMMENT = {
    ID: 'id',
    USER: 'user',
    TEXT: 'text',
    DATE: 'date',
}
// Watcher

export const WATCHER = { ID: 'id', BUG_ID: 'bug_id', USER_ID: 'user_id' }

// Notifications

export const NOTIFICATION = {
    ID: 'id',
    BUG_ID: 'bug_id',
    TEXT: 'text',
    DATE: 'date',
    CHECKED: 'checked',
}
