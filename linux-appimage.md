# AppImages

The AppImage format packages an application in a single, self-contained file. This format allows for a simplified installation process.

## Download & Install
1. Download the .AppImage file
2. Make it executable (Right Click `Properties`->`Permission`->check `Execute` ) or `
chmod a+x <file-name>` 
1. Run it once by clicking (init configs, ...)

## Add it to the Launcher and Dock (optional)
- create a .desktop file in /home/<user>/.local/share/applications
- App [Pin It!](https://github.com/ryonakano/pinit) can help with that

```
[Desktop Entry]
Name=Nextcloud
Comment=Nextcloud
Exec=/path/to/file.AppImage
Icon=/path/to/icon.png
Terminal=false
Type=Application
```

## Add it to the "Open With Other Application" dialog (optional)
- append `%F` to the exec line to indicate that a list of files can be passed to the app (see [Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) for details)
  
 `Exec=/path/to/file.AppImage %F`

## Add it to Autostart (optional)
for GNOME
```bash
gnome-session-properties
```

Add the respective entry, like `/home/<user>>/apps/Nextcloud.AppImage  --background`

## Ressources
- https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html
- https://pop-os.github.io/docs/manage-apps/using-appimages.html
- https://github.com/ryonakano/pinit