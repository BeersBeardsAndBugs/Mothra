from flask import request, Flask, render_template
from flask_api import status
from flask_cors import CORS
from models import *
import datetime
import json
import 
from playhouse.shortcuts import model_to_dict, dict_to_model
from helper import *
# import time
app = Flask(__name__)
CORS(app)

@app.route("/")
def new_user_data_ep():
    return "Hello Mothra"

@app.route("/login", methods=["POST"])
def get_user():
    given = request.get_json()
    user = User.get_or_none(email=given["email"], password=given["password"])
    if user is not None:
        return json.dumps(model_to_dict(user))
    else:
        return 'not found', status.HTTP_404_NOT_FOUND

@app.route("/user", methods=["POST", "GET"])
def create_user():
    if request.method == "POST":
        given = request.get_json()
        user_check = User.get_or_none(email=given['email'])
        if user_check is not None:
            print('not a unique email. Need to account for this on frontend')
            return "Not a unique email", status.HTTP_409_CONFLICT
        else:
            user_new = User.create(name=given["name"], password=given["password"], email=given["email"])
            user_new.save()
            user = User.get()
            user = User.get(email=given["email"], password=given["password"])
            return json.dumps(model_to_dict(user))
    elif request.method == "GET":
        users = User.select()
        user_list =[]        
        for user in users:
            user = model_to_dict(user)
            del user["password"]
            user_list.append(user)
        return json.dumps(user_list) 
    elif request.method == "DELETE":
        return "coming soon =)"


@app.route("/bug", methods=["POST", "GET", "DELETE"])
def create_bug():
    if request.method == "POST":
        given = request.get_json()
        title = given["title"]
        creator = given["creator"]
        assigned_to = given["assigned_to"]
        description = given["description"]
        created_date = datetime.datetime.now()
        updated_last = datetime.datetime.now()
        priority = given["priority"]
        status = given["status"]
        bug_new = Bug.create(assigned_to=assigned_to, title=title, creator=creator, created_date=created_date, updated_last=updated_last, priority=priority, status=status, description=description, updated_by=creator)
        bug_update = Bug.get(title=title, creator=creator, created_date=created_date, updated_last=updated_last, priority=priority, status=status, description=description, updated_by=creator)
        create_notification(bug_update.id, 'bug', bug_new.creator)
        return json.dumps(model_to_dict(bug_update))
    elif request.method == "GET":
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
    elif request.method == "DELETE":
        return "coming soon =)"

@app.route("/bug/<param_id>", methods=["PUT"])
def edit_bug(param_id):
    old_bug = Bug.get(id=param_id)
    given = request.get_json()
    update_bug = (Bug.update(given)).where(Bug.id==param_id)
    update_bug.execute()
    update_notification(param_id, 'bug', given["updated_by"], old_bug, '_none')
    return json.dumps('bug updated')

@app.route("/comment", methods=["POST"])
def write_comment():
    given = request.get_json()
    bug = Bug.get(id=given['bugId'])
    comment_new = Comment.create(bug=bug, user=given["user"], text=given["text"], date=given["date"])
    comment_update = Comment.get(bug=bug, user=given["user"], text=given["text"], date=given["date"])
    create_notification(bug.id, 'comment', bug.creator)
    return json.dumps(model_to_dict(comment_update))

@app.route("/comment/<param_id>", methods=["DELETE", "PUT", "GET"])
def delete_comment(param_id):
    print ("test")
    if request.method == "GET":
        bug = Bug.select().where(Bug.id == param_id)
        comments = Comment.select().where(Comment.bug == bug)
        bug_comments_list = []
        for comment in comments:
            comment_model = model_to_dict(comment)
            del comment_model["bug"]
            bug_comments_list.append(comment_model)
        return json.dumps(bug_comments_list)    
    elif request.method == "DELETE":
        comment = Comment.get(id=param_id)
        comment.delete_instance()
        fake_user = 'jake the fake user'
        delete_notification(comment.bug_id, comment.id, fake_user)
        return "deleted"
    elif request.method == "PUT":
        given = request.get_json()
        change_fields = given.keys()
        for change in change_fields:
            comment.change = given[change]
        bug.save()
        update_notification(comment.bug_id, 'comment', given['user'], bug, param_id)
    return "something because I have to thanks for nothin flask"
        

@app.route("/watcher", methods=["POST"])
def add_watcher():
    given = request.get_json()
    bug_id = given["bug_id"]
    user_id = given["user_id"]
    watcher_new = Watcher.create(bug_id=bug_id, user_id=user_id)
    return "saved"

@app.route("/watcher/<param_id>", methods=["DELETE"])
def remove_watcher(param_id):
    watcher = Watcher.select().where(Watcher.id == param_id).get()
    watcher.delete_instance()
    return "deleted"

@app.route("/notification/<params_user_id>", methods=["PUT", "GET"])
def check_notification(params_user_id):
    if request.method == "GET":
        notification_list = []
        watchers = Watcher.select().where(Watcher.user_id == params_user_id)
        for watcher in watchers:
            notifications = Notification.select().where(Notification.bug_id == watcher.bug_id)
            for notification in notifications:
                notification_list.append(model_to_dict(notification))
        return json.dumps(notification_list)
    elif request.method == "PUT":
        notification = Notification.get(id=param_id)
        notification.checked = True
        notification.save()
        return json.dumps("saved")


@app.route("/test", methods=["GET", "POST"])
def get_template():
    return render_template("testforms.html")

if __name__ == "__main__":
    app.run(use_reloader=True)