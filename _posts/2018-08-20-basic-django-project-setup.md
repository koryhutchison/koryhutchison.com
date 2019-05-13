---
layout: post
author: Kory Hutchison
heroTitle: Basic Django Project Setup
categories: [Django]
tags: [ test, test2 ]
excerpt: Learn how to set up a Django project
image: /assets/images/django-logo.jpg
---
Django is a web framework that makes it really easy to get started. Their
[website](https://www.djangoproject.com) says that "Django is a high-level Python
Web framework that encourages rapid development and clean, pragmatic design." I want
to highlight how I set up my projects so that I can help you always get started very
quickly.

## Environment
First things first we want to make sure we set up the environment correctly. That
way it's very easy to have multiple Django projects on the same machine. And it's
especially helpful when you have different versions of Django for those projects.
So what we're going to set up is a "virtual environment". First you'll want to install
the latest version of python from [here](https://www.python.org/downloads/). Move
to the directory where you want to make your project and then create the virtual
environment with these commands:

<highlight-code lang="bash">
pip3 install virtualenv
virtualenv env
</highlight-code>

Then activate the environment:

<highlight-code lang="bash">
source env/bin/activate
</highlight-code>

After activation, you should see a (env) appear in your command prompt. That means
we are now in the environment and any python libraries that we install will remain
within that environment. Now let's move on to installing Django!

## Installing Django
Like I said before, this is super easy! All we need to do is this:

<highlight-code lang="bash">
pip install django
</highlight-code>

Now notice that I didn't need to do pip3 this time. That's because the virtual environment
already knows that we are using python 3. Therefore, we don't need to specify it again.

Next we will create our Django project:

<highlight-code lang="bash">
django-admin startproject mysite
</highlight-code>

This creates a folder called mysite and that folder now contains your entire Django
application. Go ahead and move inside the folder and you should see the following structure
* manage.py
* mysite/
    * __init__.py
    * settings.py
    * urls.py
    * wsgi.py