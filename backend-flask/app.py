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
#app.route('/bugs/all')
#def bug_list():
#    bugs = []
#    try:
#        for bug in Bug.select():
#            bugs.append(bug)
#    except:
#        bugs = 'no bugs in db'






if __name__ == '__main__':
    app.run(use_reloader=True)
