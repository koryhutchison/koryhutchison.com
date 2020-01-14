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

## Routing and View Function

So first, you need to make sure this line exists in settings.py:

<highlight-code lang="python">
AUTH_USER_MODEL = 'account.ExampleUser'
</highlight-code>

If you named your custom user model something other than ExampleUser, than you'll
want to make sure you replace it with yours.

Next we are going to set up the route and view. Go to urls.py (Located in the same folder
as settings.py) and make the file look like this:

<highlight-code lang="python">
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('account/', include('account.urls')),
    path('admin/', admin.site.urls),
]
</highlight-code>

You can see that we only made some minor changes to the file. We added the include import so that we can
include the entire urls.py file for the account app. And that's what we added in the urlpatterns array.
So what's important to know is that now any route we make in the urls.py file in account, it will be
prepended with "account/". You can call that whatever you want, I just called it account because
it just makes sense.

Now we need to make the urls.py file in the account app! Make that, and place the following in it:

<highlight-code lang="python">
from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login),
]
</highlight-code>

The one thing that's different from this file than the other file is that we are importing
the views. With every app within a Django application, there is a file called views.py. If
you're familiar with the Model/View/Controller web architecture, views in Django are
the controller piece. I know, it's a pretty bad name for it, but that's just what they
chose to call it.

Now that you've got that code in urls.py, open up views.py and replace it with the following:

<highlight-code lang="python">
from django.shortcuts import render
from django.http import HttpResponse

def login(request):
    return HttpResponse("It works!")
</highlight-code>

So right now we're just setting it up so that we can make sure we configured the routing
and the view function correctly. What should happen is that when you go to
[localhost:8000/account/login](http://localhost:8000/account/login), you should
get back a response saying "It works!". Go ahead and try it out. If it doesn't work,
make sure you check your url and that it doesn't have a trailing forward slash. Now
that we have that set up, let's move on to making the login form and setting put that process.

## Create Form

Django makes forms very easy. All we have to do is make a class that inherits from their
form class. I like to put my forms in a separate file from the views just so views.py doesn't
get too large. So make a forms.py file in the same directory where views.py is and add the following:

<highlight-code lang="python">
from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login

class LoginForm(forms.Form):
    username = forms.CharField(label='Username', max_length=100, widget=forms.TextInput())
    password = forms.CharField(label='Password', max_length=100, widget=forms.PasswordInput())

    def clean(self):
        self.user = authenticate(username=self.cleaned_data.get('username'), password=self.cleaned_data.get('password'))
        if self.user is None:
            raise forms.ValidationError('Invalid username or password')
        return self.cleaned_data

    def commit(self, request):
        auth_login(request, self.user)
        return True
</highlight-code>

## Connect Form to View

Now that we have the form, let's wire it up inside our view! First, add the import
for the form file by adding this to the top of views.py:

<highlight-code lang="python">
from . import forms
</highlight-code>

Also, modify the django.http import to be like so:

<highlight-code lang="python">
from django.http import HttpResponse, HttpResponseRedirect
</highlight-code>

Then we'll modify the login function to look like this:

<highlight-code lang="python">
def login(request):
    # This next parameter comes in if someone tries to go to a page that requires
    # login but they haven't logged in. So we get it so we can redirect them after
    # they login.
    next = request.GET.get('next')

    if request.method == 'POST':
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            form.commit(request)
            if next:
                return HttpResponseRedirect(next)
            else:
                return HttpResponseRedirect('/account/success')
    else:
        # prepare an empty form
        form = forms.LoginForm()

    context = {
        'form': form,
        'next': next
    }

    return render(request, 'login.html', context)
</highlight-code>

So what we're going to do here is check to see if the request method is a POST. If
it's not a POST, then we'll create the form to be presented to the user. If it is a
POST, then we pass in the request data into our LoginForm, and set the result of that
to a variable called form.

Django provides a simple way to check the validity of the form by using is_valid().
I'm not going to go into detail about it, so if you want to read more about it, go to
this [link](https://docs.djangoproject.com/en/3.0/ref/forms/api/#django.forms.Form.is_valid).

So if the form is valid, then we go ahead and run the commit method on the form which
logs the user in, and then we redirect them to the page we want. All that's left now is
to create the html!

## Create the template

Now we need to create a folder called templates and put it in our account app directory.
After creating the folder, go adead and create a file called login.html and paste the following
inside of it:

{::nomarkdown}
<highlight-code lang="python">
&lt;h1&gt;Login&lt;/h1&gt;
{% raw %}{% if next %}{% endraw %}
&lt;form id="login-form" action="/login/?next={{next}}" method="POST"&gt;
{% raw %}{% else %}{% endraw %}
&lt;form id="login-form" method="POST"&gt;
{% raw %}{% endif %}{% endraw %}
    {% raw %}{% csrf_token %}{% endraw %}
    {% raw %}{{ form.as_p }}{% endraw %}
    &lt;button type="submit"&gt;Login&lt;/button&gt;
&lt;/form&gt;
</highlight-code>
{:/nomarkdown}

I'm not going to style this at all because that's not what the tutorial is about. But simply
this renders a form and uses the built in Django form rendering to render each field as a
paragraph tag. Read more about it [here](https://docs.djangoproject.com/en/3.0/topics/forms/#form-rendering-options).

Now that we've got that in there, run your app and navigate to
[localhost:8000/account/login](http://localhost:8000/account/login). You should see
your form!

## Wrap Up

Now that you see the form, there is one last piece. We need to add a success route so we
can verify that our code is working. You should already know how to do this from what
we've gone through in this post. To help you out though, you'll need to call the route
"success", and use a simple HttpResponse. That way you don't need to write a template. You can
even access the user's database information from request.user.

And that's it! I hope this tutorial was helpful!
