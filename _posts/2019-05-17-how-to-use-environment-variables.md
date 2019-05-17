---
layout: post
author: Kory Hutchison
heroTitle: How To Use Environment Variables
categories: [Django]
tags: [ Development, Python, Terminal, Nano ]
excerpt: Learn how to use environment variables in your Django projects
image: /assets/images/blog/environment.png
---
Within a normal Django project, you're bound to use some information that you need
to be kept secret. Common examples of this are API keys and the Django SECRET_KEY.
You wouldn't want these to be in your git repo because most likely your repo is
being stored on the internet at a place like [github](https://www.github.com). Sure,
you might have a private repo, but even then your secret keys are still at risk.
So what I want to show you is how you can easily set up environment variables so that
you can also use them during local development. Let's get started!

## Configuring in .bash_profile

If you don't know what .bash_profile is, it's simply a file that your bash
terminal will run every time it gets launched. I like to use .bash_profile because
that's the one I learned, but there are other files that bash uses as well.

Open up your terminal and make sure you are in your home directory like so:

<highlight-code lang="bash">
cd ~
</highlight-code>

If you are a windows user, You'll probably need to get some sort of terminal program
in order to accomplish what I'm about to show you. I'm a Mac user, so I'm not entirely
sure how it's done on Windows. This [page](https://gitforwindows.org) might be of help.

Now that you are at your home directory, open up nano:

<highlight-code lang="bash">
nano .bash_profile
</highlight-code>

If you haven't yet created a .bash_profile file yet, then Nano will create one for
you. What we're going to do is add one line that will set the Django SECRET_KEY for
our project. Put it in like so:

<highlight-code lang="bash">
export KEY="p2+$$p_@zc7m=j)6glc*t++vr2ngr^vk$0&wv1#)35z=15%9sg"
</highlight-code>

I've put in an example secret key but you should replace it with yours.

Now to save and close you simply do ^X, and then Y and enter. Right now your terminal
still doesn't know what that variable is though because we haven't relaunched the
program. One way around this is to type:

<highlight-code lang="bash">
source .bash_profile
</highlight-code>

This will reload the file and you can verify that your variable is there like so:

<highlight-code lang="bash">
echo $KEY
</highlight-code>

And you should see your key show up. Now that we have they key in our .bash_profile,
all there is left is to load that key in settings.py!

## Configure Django

This part is the easiest part. You'll see at the top that Django already imports
the Python OS library. So all you need to do is replace your secret key string and make
it look like this:

<highlight-code lang="python">
SECRET_KEY = os.environ['KEY']
</highlight-code>

And that's it! Pretty simple, huh? What's really nice about this is that you can
use your API test keys on your local, but then on your production server you can
use your real keys without changing settings.py at all. Hope you find this useful!