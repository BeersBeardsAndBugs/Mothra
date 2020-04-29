from models import *
import datetime

def create_notification(bug_id, table, user):
    if table == 'bug':
        text = f"New {table} added by {user} for bug {bug_id}."
        new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
        new_notification.save()
    else: 
        text = f"New comment for bug {bug_id} written by {user}."
        new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
        new_notification.save()
    return

# for this to work properly, we will need a user_id passed with these requests
def update_notification(bug_id, table, user, old, comment_id):
    if table == 'bug':
        text = f"{table} {bug_id} updated by {user}."
        new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
        new_notification.save()
    else:
        text = f"Comment {comment_id} updated by {user}."
        new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
    return

# for this to work properly, we will need a user_id passed with these requests
def delete_notification(bug_id, comment_id, user):
    text = f"Commment {id} of bug {bug_id} deleted by {user}."
    new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
    new_notification.save()
    return
