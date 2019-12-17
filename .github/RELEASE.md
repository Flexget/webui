# Creating a Release

Currently the webui is built nightly at 13:00 UTC as long as there are changes on the development branch. The latest release is then included with the main flexget repo.

If you have write access to this repo, you can also trigger a manual release in slack or using the github api directly to create a deployment.

To trigger a manual release in slack:

1. Go to the #development channel
2. Run the folllowing slash command (it will ask you to auth with github to link to your slack account if you haven't already)
```
/github deploy Flexget/webui
```
3. When the Popup comes up, change the `Branch or tag to deploy` to be the develop branch. Leave everything else as is. 
4. Press `Create`

You should be able to navigate to the [Build Release](https://github.com/Flexget/webui/actions?query=workflow%3A%22Build+Release%22) tab in actions and see your workflow run there as well as seeing it on the [Deployments Page](https://github.com/Flexget/webui/deployments?environment=production#activity-log)
