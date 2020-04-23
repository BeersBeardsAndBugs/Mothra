from flask import request, Flask, render_template
from flask_api import status
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
    bug_list =[]        
    for bug in bugs:
        comments = []
        for comment in bug.comments:
            comment = model_to_dict(comment)
            del comment["bug"]
            comments.append(comment)
        bug = model_to_dict(bug)
        bug.update({'comments': comments})
        bug_list.append(bug)
    return json.dumps(bug_list)

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
    user = User.get_or_none(User.email == given["email"], User.password == given["password"])

    if user is not None:
        return json.dumps(model_to_dict(user))
    else:
        return {}, status.HTTP_404_NOT_FOUND

@app.route("/comment/new/", methods=["POST"])
def write_comment():
    given = request.get_json()
    comment_new = Comment.create(bug=given["bug"], user = given["user"], text=given["text"], date=datetime.datetime.now())
    comment_new.save()
    create_notification(given["bug"], given["text"])
    return "No Problems =)"

@app.route("/comment/<param_id>/delete/", methods=["POST"])
def delete_comment(param_id):
    comment = Comment.select().where(Comment.id == param_id).get()
    comment.delete_instance()
    return "deleted"

@app.route("/notification/new/", methods=["POST"])
def create_notification():
    given = request.form
    bug_id = given["bug_id"]
    text = given["text"]
    date = datetime.datetime.now()
    notification_new = Notification.create(bug_id=bug_id, text=text, date=date)
    notification_new.save()
    created = Notification.select().where(Notification.text == text).get()
    return model_to_dict(created)

@app.route("/notification/<param_id>/", methods=["POST"])
def check_notification(param_id):
    notification = Notification.select().where(Notification.id == id).get()
    notification.checked = True
    notification.save()
    return "saved"

@app.route("/notifications/<params_user_id>/")
def get_notifications(params_user_id):
    notification_list = []
    watchers = Watcher.select().where(Watcher.user_id == params_user_id)
    for watcher in watchers:
        notifications = Notification.select().where(Notification.bug_id == watcher.bug_id)
        for notification in notifications:
            notification_list.append(model_to_dict(notification))
    return json.dumps(notification_list)

@app.route("/watcher/new/", methods=["POST"])
def add_watcher():
    given = request.get_json()
    bug_id = given["bug_id"]
    user_id = given["user_id"]
    watcher_new = Watcher.create(bug_id=bug_id, user_id=user_id)
    watcher_new.save()
    return "saved"

@app.route("/watcher/<param_id>/delete/", methods=["POST"])
def remove_watcher(param_id):
    watcher = Watcher.select().where(Watcher.id == param_id).get()
    watcher.delete_instance()
    return "deleted"

@app.route("/testforms/")
def testforms():
    return render_template("testforms.html")

if __name__ == "__main__":
    app.run(use_reloader=True)