#!/bin/zsh

npm run build-storybook && 
cd storybook-static &&
git init &&
git remote add origin https://github.com/HamSungJun/HamSungJun.github.io.git &&
git add . &&
git commit -m "deploy" &&
git push -f origin master