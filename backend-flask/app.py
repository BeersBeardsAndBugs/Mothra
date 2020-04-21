from flask import request, Flask
from models import *
import datetime
import json
from playhouse.shortcuts import model_to_dict, dict_to_model

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
# JORDON COMMENT. DELETE BEFORE MERGE
# Deleting the key "bug" from comment in this step to prevent an entire instance of 'bug' from populating the api. 
# *Shakes fist at peewee*
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
    user = (
        User.select()
        .where(User.email == given["email"] and User.password == given["password"])
        .get()
    )
    return json.dumps(model_to_dict(user))

@app.route("/comment", methods=["POST"])
def write_comment():
    given = request.get_json()
    comment_new = Comment.create(bug=given["bug"], user = given["user"], text=given["text"], date=dateime.now())
    comment_new.save()

@app.route("/comment/<id>/delete", methods=["POST"])
def delete_comment(param_id):
    comment = Comment.select().where(Comment.id == param_id).get()
    comment.delete_instance()

if __name__ == "__main__":
    app.run(use_reloader=True)
