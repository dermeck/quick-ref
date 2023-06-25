# Setup Dev Environment

## SSH Key
```bash
# create the key pair
ssh-keygen

# read the public key
cat ~/.ssh/id_rsa.pub

# check if privte key is added to ssh agent
ssh-add -L
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

## fish 

```bash
# install
sudo apt install fish

# configure as default shell
sudo chsh -s 'which fish'
```

troubleshoot ` chsh: PAM authentication failed` 
```bash
# fix the path if needed and try again (to value of `which fish`)
sudo nano /etc/passwd 
```

(changes take effect after restart)

```bash
# /etc/pam.d/chsh 
# This allows root to change user shell without being
# prompted for a password
auth        sufficient  pam_rootok.so
```

### Change config files
`~/.config/fish`
