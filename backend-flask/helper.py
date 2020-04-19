from models import *
import datetime

def create_notification(bug_id, text):
    new_notification = Notification.create(bug_id=bug_id, text=text, date=datetime.datetime.now())
    new_notification.save()