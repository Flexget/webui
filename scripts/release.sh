#! /bin/bash

if git log origin/master..origin/develop|grep '^commit '; then
  # Bunpt the current release version
  VERSION=$(npm run release:bump -- release)

  # Create the current release
  git add package.json
  git commit -m "v$VERSION"
  git tag -a -f "$VERSION" -m "$VERSION release"

  # Create dev release
  DEV_VERSION=$(npm run release:bump -- dev)
  git add package.json
  git commit -m "Prepare v$DEV_VERSION"

  # Push to master
  git branch -f master $VERSION
  git push origin master develop
  git push --tags
else
  echo "No commits, skipping release"
fi
