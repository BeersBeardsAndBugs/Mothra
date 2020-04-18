from flask import request, Flask
from models import *
import json
from playhouse.shortcuts import model_to_dict, dict_to_model

app = Flask(__name__)


@app.route("/")
def new_user_data_ep():
    return "Hello Mothra"


@app.route("/bugs/all")
def bug_list():
    bugs = Bug.select().dicts()
    bugsarray =[]
    for bug in bugs:
        bugsarray.append(bug)
    return json.dumps(bugsarray)

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


if __name__ == "__main__":
    app.run(use_reloader=True)
