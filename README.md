shunt
=====

A tiny automatic bash installer for Windows.

 1. [Dowload](https://github.com/alganet/shunt/archive/master.zip) and extract the zip.
    ![Download Screen](http://i.imgur.com/uuUUFjf.png)
 2. Execute the `shunt.bat` file.
 	![shunt donwloading dependencies...](http://i.imgur.com/y5k3JxA.png)
---

<center>![bash!](http://i.imgur.com/KlAY4VN.png)</center>

A console with bash will appear after all dependencies are
automatically downloaded. It supports:

 - Colors and cursor control (a full vt100 terminal).
 - Packages
 - Caching (it will not download dependencies next run).

#### Installing Packages

	$ mingw-get --help # See usage
	$ mingw-get list | grep PACKAGE_NAME # Search packages

#### How?

shunt uses the JSCript flavor of JavaScript, BAT scripting and a little
bit of ActiveX to automatically download and setup a portable instance
of msys, a lightweight POSIX compatibility layer.
