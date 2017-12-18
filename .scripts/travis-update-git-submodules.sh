#!/usr/bin/env bash
set -ev

if [ "$TRAVIS_EVENT_TYPE" != "cron" ]
then
    exit
fi

SUBMODULES=$( git submodule status | cut -d' ' -f 3 )
echo $SUBMODULES

git submodule foreach --recursive " \
    git status; \
    git reset --hard master; \
    git checkout master; \
    git pull origin master; \
"

# Revert travis.yml changes to .gitmodules
git checkout master '.gitmodules'

git add $SUBMODULES

git commit \
    --author="Travis CI <travis@persian-computing.org>" \
    --message="[cron] Update git submodules" \
    || exit 0 # clean exit if nothing to commit

git push "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master
