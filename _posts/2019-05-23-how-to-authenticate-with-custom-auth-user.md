---
layout: post
author: Kory Hutchison
heroTitle: How To Authenticate With Custom Auth User
categories: [Django]
tags: [ Development, Python, Authentication ]
excerpt: See how to use a custom auth user in authentication.
image: /assets/images/blog/authenticate.jpg
---
If you've seen any of my other tutorials, you might have noticed that
I went over how to create a custom user model [here](/django/2019/05/15/rapid-development-with-a-database.html).
If you haven't seen that yet, I suggest you take a look at it before you start
this tutorial.

I'm going to walk through how to set up a simple form that will allow users to
log in and authenticate with the custom user that I created in that previous tutorial.
So let's get started!

So first, you need to make sure this line exists in settings.py:

<highlight-code lang="python">
AUTH_USER_MODEL = 'account.ExampleUser'
</highlight-code>

You should have whatever you called your user model in there, but you get the gist.

## Configure the Routes

The next step is to make a few changes to your urls.py files. The first urls.py is
in the folder that is the name of your project. That urls.py is the first file Django
look to for routing. The best way to organize this is to simply reference the other
urls.py files in the other apps within your project. In the tutorial I linked to above,
I made an app called "account". So in that app we will put all the urls that pertain to it
within it's own urls.py. So first, change this line:

<highlight-code lang="python">
from django.urls import path
</highlight-code>

To this line:

<highlight-code lang="python">
from django.urls import path, include
</highlight-code>

Then we add a path within the urlpatterns list like this:

<highlight-code lang="python">
urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls'))
]
</highlight-code>

So you can see that what we did here was added an import for include so we could
use it down below in the urlpatterns. And now when we add any url to the urls.py in
the account app, they will all be under the "account/" route. So let's do that! Create
a urls.py file within the account app, and then copy and paste the following code in it:

<highlight-code lang="python">
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login)
]
</highlight-code>

Now move on to your views.py file and replace what's in there with the following code:

<highlight-code lang="python">
from django.shortcuts import render
from django.http import HttpResponse

def login(request):
    return HttpResponse("It works!")
</highlight-code>

Now go to [http://localhost:8000/account/login/](http://localhost:8000/account/login/) and
if you see "It works!" then you know that the routing was set up correctly.
