# git is not installed by default on most systems

`git` is not installed by default on

- macOS;
- Windows;
- Debian;
- Ubuntu;
- Fedora; or
- Linux Mint

`git` is installed by default on

- MX Linux;
- Lubuntu;
- XUbuntu; and
- Q4OS

To check if `git` is installed on your workstation open a terminal and run the following command

```bash
git -v
```

If `git` is installed, the command will return something equivalent to the following

```bash
git version 2.39.5
```

If `git` is not installed, the command will return the equivalent to the following:

```bash
command not found: git
```

## Install git on macOS

To install `git` on macOS choose one of the following three procedures.

1. Install [XCode](https://developer.apple.com/xcode/)

   The XCode developer suite includes the XCode command line tools. And the XCode command line tools include a `git` client.

2. Install just the XCode command line tools independent of XCode.

   ```bash
   xcode-select install
   ```

3. Install [HomeBrew](https://brew.sh/).

   HomeBrew installs the XCode command line tools as part of its own install process.

## Install git on Windows

To install `git` on Windows, choose one of the following four procedures.

1. Download and run the [Git for Windows standalone installer](https://git-scm.com/downloads/win)

   **NB:** this installer does not include an updater tool. To update a local `git` instance installed with this installer, download and run an updated installer application.

2. If you have [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/) installed run `winget install --id Git.Git -e --source winget`.

   WinGet is Microsoft’s client for Microsoft’s [Windows Package Manager](https://learn.microsoft.com/en-us/windows/package-manager/) service.

3. If you have the [Chocolatey Package Manager](https://chocolatey.org) installed run the following command in a PowerShell or Command Prompt terminal

   ```bash
   choco install git
   ```

4. If you have the [Windows Subsystem for Linux](https://learn.microsoft.com/en-au/windows/wsl/) installed, run the following command from within a WSL terminal:

   ```bash
   sudo apt install git
   ```

## Install git on Linux

1. To install `git` on a deb-based Linux workstation, run the following command:

   ```bash
   sudo apt install git
   ```

2. To install `git` on an rpm-based Linux workstation, run the following command:

   ```bash
   sudo dnf install git
   ```

<!--

linux distros and other OSes checked for git installation on default workstation installs

macOS 14.7.1						n
macOS 15.2							n
Windows 11							n
Windows 10							n
Debian 12:              n
MX Linux 23.4:          y
Fedora 41:              n
Fedora 41 Xfce:         n
Ubuntu 24.04.1          n
Lubuntu 24.04.1         y
Xubutntu 24.04.1        y
Linux Mint 22           n
Linux Mint 22 Xfce      n
Sparky Linux 7.5        n
Q4OS 5.7.21-n1          y
Q4OS 5.7.21-n1 trinity  n

-->
