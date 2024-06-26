// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//import * as vscode from 'vscode';
let vscode = require('vscode')
const XmlWorker = require('./xmlWorker');
const RecursorAgent = require('./recursorAgent');
const ExtendedDupSearch = require('./extendedDuplicateSearch');
const xml2js = require('xml2js');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let dupres = "";
	function activationActions(vss){
		//grabs the context of the current testeditor open
		const activeEditor = vscode.window.activeTextEditor;

		//if the active editor is not set return an error
		if (!activeEditor) {
			return;
		}

		
		else {
			//take everything from the first line of the document to the last
			var firstLine = activeEditor.document.lineAt(0);
			var lastLine = activeEditor.document.lineAt(activeEditor.document.lineCount - 1);
			var nrange = new vscode.Range(firstLine.range.start, lastLine.range.end);

			//initialize an xmlWorker object and call its operator function to validate the contents of the file
			var opp = new XmlWorker();
			var res = opp.XMLoperater(activeEditor.document.getText(nrange)); 

			if(res){
				//if xml content is valid parse into json format and look for duplicates
				xml2js.parseString(res, function (err, results) {
					//initialize RecursorAgent object and send the json results to the duppyfinder method 
					let recstr = '';
					if(vss == ''){
						recstr = new RecursorAgent();
						recstr.duppyFinder(results);
					}
					else{
						recstr = new ExtendedDupSearch(vss);
						recstr.duppyFinder(results);
					}

					//if there are duplicates they are made as a string in the dupres variable
					if(recstr.duplicates.length > 0){
						console.log('there are duplicates in this xml document:');
						dupres = 'there are duplicates in this xml document:';
						for(let i = 0; i < recstr.duplicates.length; i++){
							dupres = dupres + '\r\n' + recstr.duplicates[i];
							//console.log(recstr.duplicates[i]);
						}
						//console.log(dupres);

					}
					else{
						//console.log('there are no duplicates in this xml');
						dupres = 'there are no duplicates in this xml';
					}
				});
			}
			else{
				console.log("The file is either not a valid xml file or not one at all.");
				dupres = "The file is either not a valid xml file or not one at all." + res.message;
			}
		}
	}

	
	let disposable = vscode.commands.registerCommand('xml-wiz-ext.XML_WIZ', function () {
		activationActions('');
		vscode.window.showInformationMessage('searching for duplicates :)');
		vscode.window.createWebviewPanel('xml-Wiz', 'Xml Duplicates', vscode.ViewColumn.One, {}).webview.html = getWebViewContent();
	})

	let disposableOther = vscode.commands.registerCommand('xml-wiz-ext.XML_WIZ_WHOLE', async function (){
		const searchQuery = await vscode.window.showInputBox({
			placeHolder: "Search query",
			prompt: "Please enter the tag whose value you want to find a node with the same of.",
			
		  });
		if(searchQuery != ''){
			activationActions(searchQuery);
			vscode.window.showInformationMessage('searching for duplicates nodes that have the same value in the tag named ' + searchQuery);
			vscode.window.createWebviewPanel('xml-Wiz', 'Xml Duplicates', vscode.ViewColumn.One, {}).webview.html = getWebViewContent();
		}
		else if(searchQuery === ''){
			console.log(searchQuery);
			vscode.window.showErrorMessage('A search query is mandatory to execute this action');
		  }
	})

	function getWebViewContent(){
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<style>
		body
		{
			background-color: black;
			opacity: 0.5;
		}
		
		div.transbox 
		{
		  margin: 30px;
		  background-color: white;
		  border: 1px solid black;
		  opacity: 0.6;
		}

		div.transbox p 
		{
		  margin: 5%;
		  font-weight: bold;
		  color: white;
		}

		</style>
		<body>
		<div>
			<!--<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />-->
			
			<p><xmp>${dupres}</xmp></p>
		</div>
		
		</body>
		</html>`
		// return `<!DOCTYPE html>
		// <html lang="en">
		// <head>
		// 	<meta charset="UTF-8">
		// 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		// 	<title>Cat Coding</title>
		// </head>
		// <body>
		// 	<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
		// 	<p>${dupres}</p>
		// </body>
		// </html>`;
	}

	context.subscriptions.push(disposable, disposableOther);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
