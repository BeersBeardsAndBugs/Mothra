from peewee import *
from models import *
from playhouse.shortcuts import model_to_dict, dict_to_model


bug = Bug.get_or_none(id=8, title='UI Broken')
print(bug)