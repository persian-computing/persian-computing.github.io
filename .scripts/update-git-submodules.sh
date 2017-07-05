#!/usr/bin/env bash

git submodule foreach git pull
git add --all
git commit -m 'Update git submodules'
