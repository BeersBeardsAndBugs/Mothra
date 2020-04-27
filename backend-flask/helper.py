from models import *
import datetime

def create_notification(bug_id, table, user):
    text = f"New {table} added by {user} for bug {bug_id}"
    new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
    new_notification.save()
    return pass

def update_notfication(bug_id, table, user, old):
    post_update = model_to_dict(Bug.get(id=bug_id))
    change_list = []
    text = f"Bug {bug_id} updated by {user}. Fields changed = {}"
    for key in old.keys():
        if old[key] != post_update[key]:
            change_list.append(key)
    new_notification = Notification.create(bug_id=bug_id, text=text, date = datetime.datetime.now())
    new_notification.save()
    return pass