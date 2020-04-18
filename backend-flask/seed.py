from peewee import *
from models import *

user = User(name='jordon', password='123', email='123@gmail.com')
user.save()
user2 = User(name="alex", password="asdf", email='asdf@asdf.com')
user2.save()
user3 = User(name="preston", password="poogle", email='poogle@gmail.com')
user3.save()

bug1 = Bug(creator='jordon', assigned_to='preston', name='bug1', priority='high', description='im broke', created_date='tuesday', updated_last='tuesday', status='in progress')
bug1.save()
bug2 = Bug(creator='alex', assigned_to='preston', name='bug2', priority='low', description='im broke too', created_date='1-1-2020', updated_last='1-3-2020', status='in progress')
bug2.save()
bug3 = Bug(creator='preston', assigned_to='jordon', name='bug3', priority='critical', description='im lyke, super broke', created_date='1-1-2020', updated_last='1-3-2020', status='in progress')
bug3.save()


comment1 = Comment(user='jordon', bug=bug1, text="hey hey this is my cooment", date="1/1/2020")
comment1.save()
comment2 = Comment(user='alex', bug=bug1, text="comment from jordon", date="1/2/2020")
comment2.save()
comment3 = Comment(user='preston', bug=bug2, text="comment from alex", date="1/2/2020")
comment3.save()

