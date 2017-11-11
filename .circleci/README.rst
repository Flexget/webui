FlexGet WebUI CI/CD
=============

Manual Deploy
-------------
The deploy/release job can be manually triggered if required.

**WARNING: Manually triggering the deploy job WILL NOT ensure tests are passing**::

    curl -u ${CIRCLE_API_TOKEN} -d "build_parameters[CIRCLE_JOB]=build" https://circleci.com/api/v1.1/project/github/Flexget/webui/tree/develop

