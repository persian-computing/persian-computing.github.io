#!/usr/bin/env bash
set -ev

git pull --rebase
git submodule foreach git pull
git add --all
git commit -m 'Update git submodules' || true
git push
