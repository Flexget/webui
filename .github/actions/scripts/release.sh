#!/bin/bash

# Exit if any command fails
set -e

# Show commands executing
set -x

if git log --skip 1 origin/master..origin/develop|grep '^commit '; then
  cd .github/actions
  # Bump the current release version
  VERSION=$(yarn -s release:bump release)

  # Create the current release
  git add package.json
  git commit -m "v$VERSION"
  git tag -a -f "$VERSION" -m "$VERSION release"

  # Create dev release
  DEV_VERSION=$(yarn -s release:bump dev)
  git add package.json
  git commit -m "Prepare v$DEV_VERSION"

  # Push to master
  git branch -f master $VERSION
  git push origin master develop --follow-tags
  if [ $? -eq 0 ]; then
    yarn release:upload $VERSION
  fi
else
  echo "No commits, skipping release"
fi
