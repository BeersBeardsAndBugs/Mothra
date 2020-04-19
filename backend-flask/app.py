from flask import request, Flask
from models import *
import datetime
import json
from playhouse.shortcuts import model_to_dict, dict_to_model
from helper import *

app = Flask(__name__)

@app.route("/")
def new_user_data_ep():
    return "Hello Mothra"

@app.route("/bugs/all")
def get_bugs_test():
    bugs = Bug.select()
    bugsarray =[]        
    for bug in bugs:
        comments = []
        for comment in bug.comments:
            newcomment = {
                'user': comment.user,
                'text': comment.text,
                'date': comment.date
                }
            comments.append(newcomment)      
        newbug = {
            'id': bug.id,
            'assigned_to': bug.assigned_to,
            'creator': bug.creator,
            'name': bug.name,
            'description': bug.description,
            'created_date': bug.created_date,
            'updated_last': bug.updated_last,
            'priority': bug.priority,
            'status': bug.status,
            'comments': (comments)}
        bugsarray.append(newbug)
    return json.dumps(bugsarray)

@app.route("/comments/all")
def comment_list():
    comments = Comment.select().get()
    return json.dumps(model_to_dict(comments))


@app.route("/user/new/", methods=["POST"])
def create_user():
    given = request.get_json()
    name = given["name"]
    password = given["password"]
    email = given["email"]
    user_new = User.create(name=name, password=password, email=email)
    user_new.save()
    user = (
        User.select()
        .where(User.email == given["email"] and User.password == given["password"])
        .get()
    )
    return json.dumps(model_to_dict(user))


@app.route("/login/", methods=["POST"])
def get_user():
    given = request.get_json()
    print(given)
    user = (
        User.select()
        .where(User.email == given["email"] and User.password == given["password"])
        .get()
    )
    return json.dumps(model_to_dict(user))

@app.route("/bug/comment", methods=["POST"])
def write_comment():
    given = request.get_json()
    comment_new = Comment.create(bug=given["bug"], user = given["user"], text=given["text"], date=datetime.datetime.now())
    comment_new.save()
    create_notification(given["bug"], given["text"])
    return "FUCK YOU"

@app.route("/get_notifications/<params_user_id>")
def get_notifications(params_user_id):
    notification_list = []
    watchers = Watcher.select().where(Watcher.user_id == params_user_id)
    for watcher in watchers:
        notifications = Notification.select().where(Notification.bug_id == watcher.bug_id)
        for notification in notifications:
            new_notification = {
                'bug_id': notification.bug_id,
                'text': notification.text,
                'date': notification.date,
                'checked': notification.checked
            }
            notification_list.append(new_notification) 
 

    return json.dumps(notification_list)


if __name__ == "__main__":
    app.run(use_reloader=True)