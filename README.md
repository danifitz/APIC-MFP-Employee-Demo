# API Connect & MobileFirst Platform Demo

## Table of Contents

- [API Connect & MobileFirst Platform Demo](#)
	- [Prerequisites](#prerequisites)
	- [How to demo](#how-to-demo)
	- [Set up your own demo instance](#set-up-your-own-demo-instance)
		- [Setting up Cloudant](#setting-up-cloudant)
		- [Setting up API Connect](#setting-up-api-connect)
		- [Setup the mobile application](#-setup-the-mobile-application)
			- [Configure MobileFirst adapters](#configure-mobilefirst-adapters)

## Prerequisites
1. Install [Node.js](https://nodejs.org), Java 7/8 and
[Maven](https://maven.apache.org/)
2. Install API Connect, [Ionic Framework](https://ionicframework.com) & [Apache Cordova](https://cordova.apache.org/)

   `$ npm install apiconnect ionic cordova -g`
3. Download the [MFP8 Beta](https://mobilefirstplatform.ibmcloud.com/beta/)
local version for your operating system (Windows, OS X, Linux)
4. Extract the .zip and install the MFP8 Developer Kit
5. Test the MFP8 CLI is installed correctly by opening a shell and typing

   `$ mfpdev -v`
6. Test the MFP8 Server is installed correctly by opening a shell and changing
directory to where you installed the server. Run the file `run.sh` (OS X, Linux)
or `run.bat` (Windows) for example `$ ./run.sh`. Keep the server running in this shell and open a new shell.
7. Get a local copy of this repository

   `$ git clone https://github.com/danifitz/APIC-MFP-Employee-Demo.git`
8. Change directory to the Demo

   `$ cd APIC-MFP-Employee-Demo`
9. Build the `AuthAdapter` with Maven

   `$ cd AdapterServices/AuthAdapter && mvn package`
10. Deploy the `AuthAdapter` to the MFP server

    `$ mfpdev adapter deploy`
11. Repeat steps 9 & 10 for `EmployeeAdapter`
12. Register the `IBMEmployeeApp` with the MFP server

    `$ cd ../../IBMEmployeeApp && mfpdev app register`
13. Preview the app

    `$ mfpdev app preview`

    `> mbs: Mobile Browser Simulator`

## How to demo

1. Download the accompanying [presentation](INSERT)


## Set up your own demo instance

### Setting up Cloudant
1. Create a new instance of Cloudant NoSQL DB
2. Create a new database in Cloudant called `employees`
3. Use `employees.json` file to populate documents in the `employees` database
4. Add your Cloudant service credentials to
    `EmployeeAPI/server/datasources.json`

### Setting up API Connect
1. Create a new instance of the API Connect service on Bluemix
2. Launch the API Connect service. On the dashboard, create a new catalog called `EmployeeCatalog`
3. Open a shell in the `EmployeeAPI` directory and run

   `$ apic edit`
4. In the API Connect toolkit, click Publish > Add and manage targets
5. Add a new Bluemix target. Choose your region and sign in. Choose the organisation and space you created the API Connect service in. Finally, choose the `EmployeeCatalog` catalog you just created.
6. Type a name for your new application and click save.
7. Click Publish again and choose the target you just created.
8. Tick `Publish` and click the publish button
9. In the shell where `apic` is running note down the values of `API Target URL` and `TLS Profile`
10. Back in the API Toolkit, click the 'APIs' tab then the 'Assemble' tab. In the left hand palette click the funnel icon and select 'Datapower Gateway Policies'
11. In the assembly canvas click the 'invoke' node. A menu will expand. In the `Invoke URL` field add the `API Target URL` value you noted down earlier in the format below:

   `https://<API_TARGET_URL>$(request.path)`

    In the TLS Profile field add the value below:

   `client:Loopback-client`

12. Click 'Publish' again, this time select `Stage or Publish products` > `Select specific products` > `employeeapi` - Click publish
13. Open the API Connect dashboard on Bluemix. Click on the `EmployeeCatalog`. Click the `Settings` tab. Click the `Portal` tab. Under `Portal Configuration` select `IBM Developer Portal`. Under `User Registration and Invitation` > `User Registry` choose `SAML`
14. Once the portal has been setup you will receive an email, click the link in the email and create a portal `admin` account.
15. In the Portal, logout and click login, use your IBM ID. Click on the `Apps` tab. Register a new application, this will be the Employee app. Note down the `Client ID` and `Client Secret`
16. Click the `API Products` tab. Choose `EmployeeAPI` and scroll down to the `Plans` section. Click `Subscribe`. Choose the `Application` you just created and click Subscribe.

You've now created an API Connect instance, deployed the API, configured it to be managed by Datapower, setup a Developer Portal, added a new subscriber Application and subscribed to an API plan.

### Setup the mobile application

#### Configure MobileFirst adapters
1. In an editor, open `AdapterServices/EmployeeAdapter/EmployeeAdapterResource.java`
2. Replace the variable `API_ENDPOINT` with your API Endpoint
3. In the method `getHTTP()` replace the values in the two `X-IBM-Client-*` headers with the `Client ID` and `Client Secret` you noted down earlier
4. Rebuild the adapters by running `$ mvn package` in the `EmployeeAdapter` directory
5. Deploy the adapter to the MobileFirst server (make sure the server is running first)

   `$ mfpdev adapter deploy`
