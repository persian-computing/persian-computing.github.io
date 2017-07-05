#!/usr/bin/env bash

git pull --rebase
git submodule foreach git pull
git add --all
git commit -m 'Update git submodules'
