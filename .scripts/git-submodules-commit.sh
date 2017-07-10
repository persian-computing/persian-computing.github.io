#!/usr/bin/env bash
set -ev

git submodule foreach "git status; git add --all; git commit -m 'Update'; git pull --rebase"
