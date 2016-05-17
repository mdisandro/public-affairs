U.S. Army Public Affairs
======================

U.S. Army Public Affairs pages

Requirements
------------

The following tools must be installed of the host system:

0. [node.js](https://nodejs.org/download/) - Download javascript libaries used by gruntjs.
0. [gruntjs](http://gruntjs.com/) - Run task associated with this project.
0. [Ruby](https://www.ruby-lang.org/) - To support sass 
0. [Sass](http://sass-lang.com/install) - Generates CSS.
0. [jekyll](http://jekyllrb.com/) - Run jekyll associated tasks.

Installation
------------

```
git clone git@bitbucket.org:armydotmil/public-affairs.git
cd public-affairs
git checkout develop
sudo npm install
```

Usage
-----

```
grunt http-server
```

Access the site locally at http://localhost:8282/to\_frontend\_sc/

To update submodule for us-army-homepage: git submodule foreach git pull origin master

Jekyll
------

Installation docs - http://jekyllrb.com/docs/installation/
Basic Usage docs - http://jekyllrb.com/docs/usage/

Contributing
------------

At the moment contributions are only accepted from internal www.army.mil team members. The following steps are for internal content, or design, team members:

0. Go to the [develop](https://bitbucket.org/armydotmil/public-affairs/branch/develop) branch for this project.
0. Click the View source button near the top right corner.
0. Only edit files in the following directories: src/\_scss for css or src/to\_to\_frontend\_sc for html.
0. To view HTML changes, click on the raw button for the edited HTML files.
0. Copy and Paste the URL into the textbox located here: [htmlpreview](http://htmlpreview.github.io/).

Note: CSS changes here will not be reflected until a member of the development team deploys the file to the development server or to production. 

The following are steps for internal development team members:

0. Follow the installation directions above.
0. Perform ```git pull origin develop``` to update your workspace.

**To run css or js updates locally:**

        grunt local
        grunt jsuglify
    

* See the usage section above.

**Deploy updates to development run:**

    
    grunt dev
    grunt jsuglify
    

* Using SFTP push the files to the development server.
* Access the site in development at SERVER ADDRESS/development/public-affairs/to\_frontend\_sc/.

**Deploy updates to production and for commits run:**

    grunt cdn
    grunt jsuglify


* Push the files to production.
* Once upadate are live, merge the develop branch into the master branch.

    ``` 
    git checkout master
    git merge --no-ff develop
    ```

* Bump the project version.

    ``` 
    grunt bump
    ```

* Push tags and updates to the remote master repo.

    ``` 
    git push origin master
    git push --tags
    ```

* Sychronize the develop branch.

    ``` 
    git checkout develop
    git pull origin master
    git push origin develop
    ```
