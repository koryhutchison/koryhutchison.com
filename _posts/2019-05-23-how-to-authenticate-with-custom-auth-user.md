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



