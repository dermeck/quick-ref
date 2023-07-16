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


## NodeJs

```bash
# add repo
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -

# install
sudo apt -y install nodejs
```

---

troubleshhot `Fix sub-process /usr/bin/dpkg returned an error code (1)`
```bash
# clean out unused software
sudo apt autoremove

# remove bad package
sudo apt-get remove --purge package_name

# force install
sudo apt-get install -f

# reconfigure dpkg
sudo dpkg --configure -a
```
https://phoenixnap.com/kb/fix-sub-process-usr-bin-dpkg-returned-error-code-1

## Firefox Developer Edition

### 1. Downlaod and Install
```bash
# Download
wget "https://download.mozilla.org/?product=firefox-devedition-latest-ssl&os=linux64&lang=en-US" -O Firefox-dev.tar.bz2

# Unpack
sudo tar xjf Firefox-dev.tar.bz2 -C /opt/

# Remove Tar
rm -r Firefox-dev.tar.bz2

# Create Symlink (to us it globally)
sudo ln -s /opt/firefox/firefox /usr/local/bin/firefox-dev
```

The application can now be run with `firefox-dev`.

### 2. Desktop Icon + Dock

```bash
# Create Desktop file
nano Firefox-dev.desktop
```

File Content:
```
[Desktop Entry]
Version=1.0
Name=Firefox Developer Edition
Exec=/usr/local/bin/firefox-dev %u
Icon=/opt/firefox/browser/chrome/icons/default/default128.png
comment=browser
Type=Application
Terminal=false
Encoding=UTF-8
MimeType=text/html;text/xml;application/xhtml+xml;application/vnd.mozilla.xul+xml;text/mml;x-scheme-handler/http;x-scheme-handler/https;
StartupNotify=true
Categories=Network;WebBrowser;
Keywords=web;browser;internet;
Actions=new-window;new-private-window;
StartupWMClass=Firefox Developer Edition;

[Desktop Action new-window]
Name=Open a New Window
Exec=/usr/local/bin/firefox-dev %u

[Desktop Action new-private-window]
Name=Open a New Private Window
Exec=/usr/local/bin/firefox-dev --private-window %u
```

```bash
# Put it to the right place
sudo cp Firefox-dev.desktop /usr/share/applications/

# Make sure it's executable
sudo chmod +x /usr/share/applications/Firefox-dev.desktop
```

### 3. Uninstall
```bash
sudo rm -r /opt/firefox/
sudo rm /usr/local/bin/firefox-dev
sudo rm /usr/share/applications/Firefox-dev.desktop
```


### Resources
- https://linux.how2shout.com/how-to-install-firefox-developer-edition-on-ubuntu-22-04-or-20-04/ 
- https://averagelinuxuser.com/ubuntu_custom_launcher_dock/
- https://wiki.ubuntuusers.de/opt/
