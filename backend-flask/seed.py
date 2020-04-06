from peewee import *
from models import *

user = User(name='jordon', password='123', email='123@gmail.com')
user.save()

bug1 = Bug(creator=user, assigned_to=user, name='bug1', priority='high', description='im broke', created_date='tuesday', updated_last='tuesday', status='in progress')
bug1.save()
bug2 = Bug(creator=user, assigned_to=user, name='bug2', priority='low', description='im broke too', created_date='1-1-2020', updated_last='1-3-2020', status='in progress')
bug2.save()

