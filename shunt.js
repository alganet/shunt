WScript.Echo("Initializing...");

var windowsCmd = new ActiveXObject("WScript.Shell");
var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
var downloadTarget = "http://ftp.ntua.gr/mirror/mingw/Installer/mingw-get/mingw-get-0.6.2-beta-20131004-1/mingw-get-0.6.2-mingw32-beta-20131004-1-bin.zip";
var temporaryDestination = fileSystem.getAbsolutePathName(fileSystem.getSpecialFolder(2) + "\\mingw-get.zip");
var downloadDestination = fileSystem.getAbsolutePathName(".\\.mingw\\");

if (fileSystem.folderExists(downloadDestination)) {
    windowsCmd.Run("cmd /C \"" + downloadDestination  + "\\msys.bat --mintty\"", 1, true);
    WScript.quit();
} 


WScript.Echo("Downloading...");
var httpConnection = new ActiveXObject("WinHttp.WinHttpRequest.5.1"); 
httpConnection.open("GET", downloadTarget, false);
httpConnection.send();


if (fileSystem.fileExists(temporaryDestination)) {
    fileSystem.deleteFile(temporaryDestination);
}

if (httpConnection.status = 200) {
    WScript.Echo("Saving...");
    var fileStream = new ActiveXObject("ADODB.Stream");
    fileStream.type = 1;
    fileStream.open();
    fileStream.write(httpConnection.ResponseBody);
    fileStream.saveToFile(temporaryDestination);
    fileStream.close();

    if ( ! fileSystem.folderExists(downloadDestination)) {
        fileSystem.createFolder(downloadDestination);
    }

    WScript.Echo("Extracting...");
    var windowsApplication = new ActiveXObject("Shell.Application");
    var compressedFiles = windowsApplication.nameSpace(fileSystem.getFile(temporaryDestination).path).items();
    windowsApplication.nameSpace(fileSystem.getFolder(downloadDestination).path).copyHere(compressedFiles, 4 + 16 + 1024);

    WScript.Echo("Configuring...");
    var profileCmd = windowsCmd.Exec("cmd /C \"copy .\\profile.xml.dist " + downloadDestination  + "\\var\\lib\\mingw-get\\data\\profile.xml\"");

    WScript.Echo("Updating Package List...");
    var mingwCmd = windowsCmd.Exec("cmd /C \"" + downloadDestination  + "\\bin\\mingw-get.exe update 2>&1\"");

    while (mingwCmd.status == 0) {
        WScript.Echo(mingwCmd.stdOut.readLine());
    }

    WScript.Echo("Installing Base System...");
    var mingwCmd = windowsCmd.Exec("cmd /C \"" + downloadDestination  + "\\bin\\mingw-get.exe install msys-base 2>&1\"");

    while (mingwCmd.status == 0) {
        WScript.Echo(mingwCmd.stdOut.readLine());
    }

    WScript.Echo("Installing Console...");
    var mingwCmd = windowsCmd.Exec("cmd /C \"" + downloadDestination  + "\\bin\\mingw-get.exe install msys-mintty 2>&1\"");

    while (mingwCmd.status == 0) {
        WScript.Echo(mingwCmd.stdOut.readLine());
    }

    WScript.Echo("Done!");

    windowsCmd.Run("cmd /C \"" + downloadDestination  + "\\msys.bat --mintty\"", 1, true);

}