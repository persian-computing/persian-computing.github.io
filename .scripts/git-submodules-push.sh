#!/usr/bin/env bash
set -ev

git submodule foreach "git push"
