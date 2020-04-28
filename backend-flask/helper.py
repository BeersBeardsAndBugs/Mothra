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
    return pass

# for this to work properly, we will need a user_id passed with these requests
def update_notfication(bug_id, table, user, old, comment_id):
    if table == 'bug':
        post_update = model_to_dict(Bug.get(id=bug_id))
        change_list = []
        for key in old.keys():
            if old[key] != post_update[key]:
                change_list.append(key)
        text = f"{table} {bug_id} updated by {user}. Fields changed = {change_list}."
        new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
        new_notification.save()
    else:
        text = f"Comment {comment_id} updated by {user}."
        new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
    return pass

# for this to work properly, we will need a user_id passed with these requests
def delete_notification(bug_id, comment_id, user)
    text = f"Commment {id} of bug {bug_id} deleted by {user}."
    new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
    new_notification.save()
    return pass

