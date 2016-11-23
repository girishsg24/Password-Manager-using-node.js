console.log("Starting password Manager");
var storage=require('node-persist');
storage.initSync();
var crypto=require('crypto-js');
var argv=require('yargs')
	.command('create','Creates an account',function(yargs){
		yargs.options({
			userName: {
				demand:true,
				alias: 'u',
				description:'User name or Email',
				type: 'string'
			},
			name:{
				demand:true,
				alias: 'n',
				description:'Name of the account(eg: Twitter, Gmail)',
				type: 'string'
			},
			password:{
				demand:true,
				alias: 'p',
				description:'password for the account',
				type: 'string'
			},
			masterPassword:{
				demand: true,
				alias: 'm',
				description: 'Master Password',
				type: 'string'
			}


		}).help('help');
	})

	.command('get','Returns the existing account',function(yargs){
		yargs.options({
			name:{
				demand:true,
				alias: 'n',
				description:'Name of the account holder',
				type: 'string'
			},
			masterPassword:{
				demand: true,
				alias: 'm',
				description: 'Master Password',
				type: 'string'
			}
		}).help('help');

	})
	.help('help').argv;

function saveAccounts(accounts,masterPassword)
{

	
	var encryptedAccounts=crypto.AES.encrypt(JSON.stringify(accounts),masterPassword);
	storage.setItemSync('accounts',encryptedAccounts.toString());
	return accounts;
}

function getAccounts(masterPassword)
{
	var encryptedAccounts=storage.getItemSync('accounts');
	var accounts=[];
	if (typeof encryptedAccounts==='undefined')
		return accounts;
	var bytes=crypto.AES.decrypt(encryptedAccounts,masterPassword);
	accounts=JSON.parse(bytes.toString(crypto.enc.Utf8));
	return accounts; 
}


function createAccount(account,masterPassword)
{
	var accounts=getAccounts(masterPassword);
	accounts.push(account);
	saveAccounts(accounts,masterPassword);
	return account;
}

function getAccount(accountName,masterPassword)
{
	var accounts=getAccounts(masterPassword);
	if (typeof accounts!='undefined')
	{
		for (var i = 0; i < accounts.length; i++)
		{
			if (accounts[i].name===accountName)
			{
			return accounts[i];
			}
		}
	}
}

if (argv._[0]==='create')
{
	try{
		var createdAccount=createAccount({
			name:argv.name,
			userName:argv.userName,
			password:argv.password
			},argv.masterPassword);
		console.log('Account Created!');
		console.log(createdAccount);
		}
	
	catch(e){
		console.log('Unable to create account');
	}
}
else if  (argv._[0]==='get')
{
	try{
		var exitingFetchedAccount=getAccount(argv.name,argv.masterPassword);
		if (typeof exitingFetchedAccount==='undefined')
				console.log('Account not found');
		else
			{
				console.log('Account found!');
				console.log(exitingFetchedAccount);
			}
	}
	catch(e){
			console.log('Failed to fetch the account');
	}
}	