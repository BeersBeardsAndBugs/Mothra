from peewee import *
from models import *

bug = Bug.get(id=1, title='UI Broken')
print(bug)