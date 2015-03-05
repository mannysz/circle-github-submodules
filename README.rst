Circle-CI Github Submodules
=================================

This repository holds the module that integrates GitHub Webhooks Handler with Circle-CI API build triggering. Once a submodule that is hooked to this endpoint is updated on GitHub, it will triiger a build on the given branch it was updated.

The problem solved
---------------------------------
It was build due to the lack of support from Heroku on private submodules branch remote upstream. After git 1.8.2 its possible to create submodules that automatically follows a branch without needing to commit the subcommits on the main git repository. You can update all submodules by using the following command-line:

.. code:: bash
    git submodule sync
    git submodule update --init --remote

Unfortunately, heroku do not updates all its submodules using the '--remote' flag, so we decided to integrate the toolchain with circle-ci to run tests and deployment tasks everytime a submodule is updated on GitHub (using the GitHub webhooks).

Observe the following repo structure:

A -
  | - B
  | - C

Where,

A
    Build repository. It contains two or more submodules that will be build by an automated task on circle-ci.

B
    A given dependency for the project. When it is updated on github, and it is properly configured with github webhooks, it will trigger our deployment script to trigger the circle-ci API build endpoint.

C
    Same as *B*. Just for multiple submodules representation.

Given this project structure, your *circle.yml*  should be stored on the repository '*A*' and the other two repositories should have a webhook pointing to this software running on any infrastructure opened for the web.

Circle-ci runs all the tests and deploys the code to the servers equivalent to the given branch (github webhooks do not support specific branch hooks, so you need to change on this project the branches you need to deploy) servers that lies on your server infrastructure.

Additional purpose
---------------------------------
It can be used to deploy to any other infrastructure using rsync, fabric, ansible, capistrano or any other automated deployment tool if its done on your circle.yml file on the project. You just need to adjust it on your circle-ci build configuration and the branches on the 'app.js' file on this project root.

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
