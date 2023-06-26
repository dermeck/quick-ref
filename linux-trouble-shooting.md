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