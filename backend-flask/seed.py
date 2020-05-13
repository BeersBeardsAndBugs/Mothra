from peewee import *
from models import *
from faker import Faker
import random 
from datetime import datetime, timedelta
fake = Faker()

print('creating users..')
user = User.create(name='jordon', password='123', email='123@gmail.com')
user2 = User.create(name="alex", password="asdf", email='asdf@asdf.com')
user3 = User.create(name="preston", password="poogle", email='poogle@gmail.com')

priority_list=[
    'Blocker',
    'Critical',
    'High',
    'Normal',
    'Enhancement',
    ]
status_list=[
    'Not Started',
    'In Progress',
    'Ready for Review',
    'Approved',
    'Merged',
]
user_list = User.select()
print (user_list)
print('creating bugs and comments..')
class assigned_to_class:
    name = ''

for _ in range(70):
    random.shuffle(priority_list)
    random.shuffle(status_list)
    creator = user_list[random.randint(0,2)]
    random_num = random.randint(0,3)
    if random_num == 3:
        assigned_to = assigned_to_class()
    else:
        assigned_to = user_list[random.randint(0,2)]
    updated_by = user_list[random.randint(0,2)]
    bug = Bug.create(
        title=fake.bs(),
        creator=creator.name,
        priority=priority_list[0],
        description=fake.sentence(),
        created_date=fake.date(),
        updated_last= fake.date(),
        status=status_list[0],
        updated_by=updated_by.name,
        assigned_to=assigned_to.name
        )
    for _ in range(random.randint(1,5)):

        Comment.create(
            user=(user_list[random.randint(0,2)]).name,
            bug=bug,
            text=fake.sentence(),
            date=fake.date()    
        )
print('creating notifications..')
for _ in range(50):
        Notification.create(
            bug_id=(random.randint(1, 24)),
            text=fake.sentence(),
            date=fake.date()
        )

watcher1 = Watcher.create(bug_id=1, user_id=1)
watcher2 = Watcher.create(bug_id=2, user_id=1)
watcher3 = Watcher.create(bug_id=1, user_id=2)
