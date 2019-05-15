---
layout: post
author: Kory Hutchison
heroTitle: Rapid development with a database
categories: [Django]
tags: [ Development, Python, Database, PostgreSQL ]
excerpt: Learn how I make it very easy to develop with a database.
image: /assets/images/blog/rapid-development.png
---
Alright. So in my [previous tutorial](/django/2019/05/14/basic-django-project-setup.html) I
went over how to set up a basic Django project and connect it to a PostgreSQL database.
So now that we have a database connected, most likely when you start developing you'll
test a variety of scenarios and make modifications to the data in your database. So how
do you easily revert those changes? Is there a way to make it so there is always
specific default data in your database to work with? Let me show you how.

## Create the file

So first we are going to create a file called initialize.py. You can call it whatever
you want, but that's what I call it. We're going to use this file to work all of this
magic that I speak of. I like this file to be in the same directory as manage.py. Just to
keep things organized.

Start out the file with these lines:

<highlight-code lang="python">
import django
from django.core import management
from django.db import connection
import os, sys


# ensure the user really wants to do this
confirm = input('''
  Do you want to drop and recreate the entire database?

  Please type 'yes' to confirm the data destruction: ''')
if confirm.lower() != 'yes':
    print()
    print('  exiting')
    sys.exit(1)

# initialize the django environment
os.environ['DJANGO_SETTINGS_MODULE'] = '[your project name].settings'

django.setup()
</highlight-code>

Up until this point, all we are doing is importing the libraries that we need,
confirming with the user that they actually want to delete the database, and letting
Django know what settings file to look for when setting up. You'll need to put
your project name in there so that it works for you.

Next we are going to add the code to delete the database and perform the migrations
again. We'll do that with the following code:

<highlight-code lang="python">
# drop and recreate the database tables
print()
print('Living on the edge!  Dropping the current database tables.')
with connection.cursor() as cursor:
    cursor.execute("DROP SCHEMA public CASCADE")
    cursor.execute("CREATE SCHEMA public")
    cursor.execute("GRANT ALL ON SCHEMA public TO postgres")
    cursor.execute("GRANT ALL ON SCHEMA public TO public")

# make the migrations and migrate
management.call_command('makemigrations')
management.call_command('migrate')
</highlight-code>

So you might be wondering what the public schema is. Every database in PostgreSQL
has a schema called public. So unless you have created a schema yourself, then this is
what you'll want. Also, pay attention to the third line in the cursor and how it grants
access to postgres. That's the user/owner that you tied to the database. You might
need to look in pgAdmin to see if the user is different, but most likely this is the same for you.
Then you can see that we run the same commands that we ran in my [previous tutorial](/django/2019/05/14/basic-django-project-setup.html)
for moving the models into the database.

Now that we have the whole database wipe part finished, let's move on to seeding
it with data.

## Create App and Model

So if we want to seed the database, we probably want a model to seed with. I'll show
you how to leverage Django's AbstractUser model to create your user models. First we'll
need to create an app. Make sure you're in the same directory as manage.py and run this:

<highlight-code lang="bash">
python manage.py startapp account
</highlight-code>

Going along with my typical conventions, I'm naming it account because this would
be where you would have all your pages for the user's account. And it makes logical
sense to put the user model here.

After running that command you'll now see a models.py file. Open it up and place the
following in there:

<highlight-code lang="python">
from django.contrib.auth.models import AbstractUser

class ExampleUser(AbstractUser):
    # id
    # username
    # password
    # first_name
    # last_name
    # email
    # last_login
    # is_superuser
    # is_staff
    # is_active
    # date_joined
    phone = models.CharField(max_length=10)
</highlight-code>

What we're doing is subclassing the AbstractUser class. AbstractUser is a default class
that comes with Django. To help me remember the fields that come from AbstractUser, I
like to add them as comments inside of the class. For simplicity sake, I added a phone
number field to the class, but in reality you probably would add more too it. Such as
address information. Now that we have app and model created, head over to settings.py.

We need to add 2 things in this file. First, we need to tell Django that the account app
exists. On line 33 you'll find an array called INSTALLED_APPS. Add your account app to it so
it looks like this:

<highlight-code lang="python">
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'account'
]
</highlight-code>

Then at the very bottom of the file, we need to tell Django what model it should
use for authentication. Since we created our own user model, we define it like so:

<highlight-code lang="python">
AUTH_USER_MODEL = 'account.ExampleUser'
</highlight-code>

Now that we have all the setup in place, go ahead and run initialize.py.

<highlight-code lang="bash">
python initialize.py
</highlight-code>

You should see it output that there was a new migration created for account, and it
will show all the migrations being performed. If you see "No changes detected", you
might need to just run the migrations manually. Note: you can run migrations for just
a specific app by putting the app name after "makemigrations".

## Add data to initialize.py

Go ahead and open initialize.py and add the following lines:

<highlight-code lang="python">
from account import models as amod

user = amod.ExampleUser()
user.first_name = 'John'
user.last_name = 'Smith'
user.username = 'john.smith'
user.set_password('Password1')
user.email = 'john.smith@example.com'
user.phone = '1234567890'
user.save()
</highlight-code>

When we run initialize.py again, this will create a user in our database. I like to
create my objects like this because I think this is a more simple way to read it. You can
also add the properties as parameters or even use the create method. You can see all
those different options [here](https://docs.djangoproject.com/en/2.1/topics/db/queries/#creating-objects).
But what's really important is putting .save() at the end of it all. Without that, Django
won't put anything into the database.

Go ahead and run initialize.py, and then look in pgAdmin to see if the user shows up! This
file can be incredibly useful when things get messed up in your database during development. I find
it super handy, and I hope you do too!
