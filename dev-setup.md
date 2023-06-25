# Setup Dev Environment

## SSH Key
```bash
# create the key pair
ssh-keygen

# read the public key
cat ~/.ssh/id_rsa.pub

# check if privte key is added to ssh agent
ssh-add -L
s
# add it if needed
ssh-add ~/.ssh/<pkey>
```

## Global git Setting

### name / email

```
git config --global user.name "dermeck"
git config --global user.email you@example.com
```

### .gitignore

Create ignore file in the home folder

```bash
touch ~/.gitignore
```

Add ignore rules
```bash
# ~/.gitignore
draft/*
``` 

Configure git to use the globale ignore file
```bash
git config --global core.excludesfile ~/.gitignore
``` 
