from peewee import *
from models import *
query = Bug.select().where(Bug.name == 'bug2')
for user in query:
  print(user.name)
