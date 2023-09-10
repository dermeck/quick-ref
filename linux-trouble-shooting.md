## Blutooth stutter (mouse + keyboard lag for ~1sec)

```bash
cat /sys/module/usbcore/parameters/autosuspend
# 2

# set as boot parameter
sudo kernelstub -a "usbcore.autosuspend=-1"
``` 

## Cracking audio when sound card is enabled/disabled

```bash
# read
cat /sys/module/snd_hda_intel/parameters/power_save
# 1

# one-time fix (will not persist)
sudo  echo 0 | sudo tee /sys/module/snd_hda_intel/parameters/power_save

# set as boot parameter
sudo kernelstub -a "snd_hda_intel.power_save=0"
```

https://community.frame.work/t/tracking-headphone-jack-intermittent-noise/5246/61

## Autostart Nextcloud client
1. Launcher `Startup Applications`
2. Add new entry for NextCloucd:
   - command: `flatpak run com.nextcloud.desktopclient.nextcloud`


## Setup Printer

```bash
# check if printer is connected
lsusb
    # Bus 003 Device 004: ID 03f0:e82a HP, Inc HP Laser 107a
```

### find ipp and remove it
```bash
ps ax | grep ipp
   # 8266 ?        SNsl   0:00 /sbin/ipp-usb udev
   # 8986 pts/0    S<+    0:00 grep --color=auto ipp
sudo apt purge ipp-usb
```

### restart cups
```
sudo systemctl restart cups
``` 

### Configure in CUPS

`localhost:631`
(login with your admin user)

Add Printer, `Administration -> Add Printer`

Driver:
- (Laser 10xs)
- HP Laser Ns 1020, hpcups 3.21.12 (grayscale)

Print Testpage
`Printers`-> Drucker wählen -> `Maintenance`


you may have to change rights
```
sudo usermod -a -G lpadmin <username>
```

### Ressources:
- https://askubuntu.com/questions/1279136/using-hp-laser-107a-with-ubuntu-20-04
   > This indicates that the printer understands the IPP-over-USB protocol. See here. On Ubuntu 20.04 ippusbxd is responsible for IPP-over-USB communication. ippusbxd commandeers the USB interface so that nothing else can use it. That is why lpinfo -v does not show a usb URI. Manjaro does not use ippusbxd by default as Ubuntu does.

- https://wiki.debian.org/CUPSDriverlessPrinting

(dpkg -S ipp-usb)