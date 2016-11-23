# Password-Manager
An app to manage passwords of different accounts.
The app lets the user create an account & save it in a persistant folder after encrypting the data.
Also it allows the user to fetch the account, the account stored is first decrypted & displayed later.

The code makes use of JSON formatting, encryption using crypto module & yargs module for user interaction.

*****Requires the installation of yargs, crypto-js & node-persist.********
 
 Use create & get commands to create account.
 
 to create we use:
 Eg: npm start -- create -n facebook -u user1 -p pass123 -m somekey
 
  --userName, -u        User name or Email                   [string] [required]
  --name, -n            Name of the account(eg: Twitter, Gmail)
                                                             [string] [required]
  --password, -p        password for the account             [string] [required]
  --masterPassword, -m  Master Password                      [string] [required]

to fetch accounts we use:
Eg:  npm start -- get -n facebook -m somekey

 --name, -n            Name of the account holder           [string] [required]
  --masterPassword, -m  Master Password                      [string] [required]
