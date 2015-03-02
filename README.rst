Contentools Deployment Tools
=================================

This repository holds the module that integrates GitHub Webhooks Handler with Heroku deployment on Circle-CI infrastructure.

The problem solved
---------------------------------
It was build due to the lack of support from Heroku on private submodules branch remote upstream. After git 1.8.2 its possible to create submodules that automatically follows a branch without needing to commit the subcommits on the main git repository. You can update all submodules by using the following command-line:

.. code-block:: shell
    git submodule sync
    git submodule update --init --remote

Unfortunately, heroku do not updates all its submodules using the '--remote' flag, so we decided to integrate our toolchain with circle-ci to run tests and deployment tasks everytime a submodule is updated on GitHub (using the GitHub webhooks).

Circle-ci runs all the tests and deploys our code to the staging and production servers that lies on Heroku infrastructure.

Additional purpose
---------------------------------
It can be used to deploy to any other infrastructure using rsync, fabric, ansible, capistrano or any other automated deployment tool if its done on your circle.yml file on the project. You just need to adjust it on your circle-ci build configuration.

Configuring The Deployment Tool
---------------------------------

In order to use the automated deployment tool you should deploy this repository to a Github or another Node.js hosting service and make sure the following environment variables are defined for the given node.js instance:

* PORT: should be defined for any environment outside Heroku infrastructure.
* CIRCLECI_TOKEN: the circle-ci secret key to use its web API.
* SECRET_KEY: the GitHub secret key used on the given repository.
* PROJECT_NAME: the project name reference. (**i.e: github_user/project_name**)

Collaborations
=================================
Please feel free to fork and make your pull requests with any improvements. Currently we have intention in mantaining this project for further purposes.
