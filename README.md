# API Connect & MobileFirst Platform Demo

## Prerequisites
1. Install [Node.js](https://nodejs.org), Java 7/8 and
[Maven](https://maven.apache.org/)
2. Install API Connect, [Ionic Framework]
(https://ionicframework.com) & [Apache Cordova]
(https://cordova.apache.org/)
`$ npm install apiconnect ionic cordova -g`
3. Download the [MFP8 Beta](https://mobilefirstplatform.ibmcloud.com/beta/)
local version for your operating system (Windows, OS X, Linux)
4. Extract the .zip and install the MFP8 Developer Kit
5. Test the MFP8 CLI is installed correctly by opening a shell and typing
`$ mfpdev -v`
6. Test the MFP8 Server is installed correctly by opening a shell and changing
directory to where you installed the server. Run the file `run.sh` (OS X, Linux)
or `run.bat` (Windows) for example `$ ./run.sh`. Keep the server running in
this shell and open a new shell.
7. Get a local copy of this repository
`$ git clone https://github.com/danifitz/APIC-MFP-Employee-Demo.git`
8. Change directory to the Demo
`$ cd APIC-MFP-Employee-Demo`
9. Build the `AuthAdapter` with Maven
`$ cd AdapterServices/AuthAdapter`
`$ mvn package`
10. Deploy the `AuthAdapter` to the MFP server
`$ mfpdev adapter deploy`
11. Repeat steps 9 & 10 for `EmployeeAdapter`
12. Register the `IBMEmployeeApp` with the MFP server
`$ cd ../../IBMEmployeeApp`
`$ mfpdev app register`
13. Preview the app
`$ mfpdev app preview`
Choose `> mbs: Mobile Browser Simulator`

## Usage

Add guide to use this demo

1. Email Daniel and ask for Cloudant credentials, add them to
`EmployeeAPI/server/datasources.json`
2. Download the accompanying [presentation](INSERT LINK)
