from flask import request, Flask
from models import *
import json
from playhouse.shortcuts import model_to_dict, dict_to_model

app = Flask(__name__)

@app.route('/')
def new_user_data_ep():
    return 'Hello Mothra'

@app.route('/bugs/all')
def bug_list():
    bugs = Bug.select().get() 
    return json.dumps(model_to_dict(bugs))

@app.route('/user/new', methods=['POST'])
def create_user():
    name = request.form['name']
    password = request.form['password']
    email = request.form['email']
    user_new = User.create(name=name, password=password, email=email)
    user_new.save()

@app.route('/user/<int:id>')
def get_user(id):
    user = User.select().where(User.id == id).get()
    return json.dumps(model_to_dict(user)) 
    










if __name__ == '__main__':
    app.run(use_reloader=True)
