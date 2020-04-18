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
  user = CharField(null = False)
  text = CharField(null=False)
  date = CharField(null=False)

db.connect()
db.create_tables([User, Bug, Comment])

# query = (Comment.select().join(Bug, on=(Comment.bug == Bug.id)).where(Bug.name == 'bug2'))
# for comment in query:
#   print(comment.text)

queery = Bug.select().where(Bug.name == 'bug1').get()
print(queery.name)
for comment in queery.comments:
  print(f"This is my text {comment.text}")
