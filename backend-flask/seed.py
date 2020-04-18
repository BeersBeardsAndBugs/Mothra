from peewee import *
from models import *

user = User(name='jordon', password='123', email='123@gmail.com')
user.save()
user2 = User(name="alex", password="1", email='1@1.com')
user2.save()

bug1 = Bug(creator=user, assigned_to=user, name='bug1', priority='high', description='im broke', created_date='tuesday', updated_last='tuesday', status='in progress')
bug1.save()
bug2 = Bug(creator=user, assigned_to=user, name='bug2', priority='low', description='im broke too', created_date='1-1-2020', updated_last='1-3-2020', status='in progress')
bug2.save()

comment1 = Comment(user=user, bug=bug1, text="hey hey this is my cooment", date="1/1/2020")
comment1.save()
comment2 = Comment(user=user, bug=bug2, text="comment from jordon", date="1/2/2020")
comment2.save()
comment3 = Comment(user=user2, bug=bug2, text="comment from alex", date="1/2/2020")
comment3.save()
