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

db.connect()
db.create_tables([User, Bug])

