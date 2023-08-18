# Push all local repository files to the new github repository.

If you creat a new repository in Github with nothing (not even README.md) and want to push all the files from a local folder to that repository, do the following commands to merge the Github repository you just created with the local folder.

```
git init
git remote add origin git@github.com:example/example.git
git branch -M main
git add .
git commit -m 'Your Commitment Here'
git push -u origin main
```

# Avoid chaos

If you delete a file from Github and also want to delete it locally, just simply delete it locally. Trying the command to control the whole progress is annoying and not efficient, unless you clearly know what to do. If not, a lof of problem like unsuccesful push and pull may occure.
