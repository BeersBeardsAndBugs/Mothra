from peewee import *

db=SqliteDatabase('mothra.db')

# check out validators
class BaseModel(Model):
  class Meta:
    database=db

class User(BaseModel):
  name = CharField(null=False)
  password = CharField(null=False)
  email = CharField(null=False, unique = True)

class Bug(BaseModel):
  title = CharField(null = False)
  assigned_to = CharField(null = True)
  creator = CharField(null=False)
  name = CharField(null=False)
  description = CharField(null=False)
  created_date = CharField(null=False)
  updated_last = CharField(null=False)
  priority = CharField(null=False)
  status = CharField(null=False)

class Comment(BaseModel):
  bug = ForeignKeyField(Bug, backref="comments")
  user = CharField(null=False)
  text = CharField(null=False)
  date = CharField(null=False)

class Watcher(BaseModel):
  bug_id = IntegerField(null=False)
  user_id = IntegerField(null=False)


class Notification(BaseModel):
  bug_id = IntegerField(null=False)
  text = CharField(null=False)
  date = CharField(null=False)
  checked = BooleanField(null=False, default=False)  

db.connect()
db.create_tables([User, Bug, Comment, Watcher, Notification])

