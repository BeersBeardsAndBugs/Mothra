from peewee import *

db=SqliteDatabase('mothra.db')

# check out validators

class BaseModel(Model):
  class Meta:
    database=db

class User(BaseModel):
  name = CharField(null = False)
  password = CharField(null = False)
  email = CharField(null = False, unique = True)

class Bug(BaseModel):
  assigned_to = CharField()
  creator = CharField(null = False)
  name = CharField(null = False)
  description = CharField(null = False)
  created_date = CharField(null = False)
  updated_last = CharField(null = False)
  priority = CharField(null = False)
  status = CharField(null = False)

class Comment(BaseModel):
  bug = ForeignKeyField(Bug, backref="comments")
  user = ForeignKeyField(User, backref="comments")
  text = CharField(null=False)
  date = CharField(null=False)


db.connect()
db.create_tables([User, Bug, Comment])

