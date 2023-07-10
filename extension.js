// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const XmlWorker = require('./xmlWorker');
const duplicateFinder = require('./duplicateFinder');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const activeEditor = vscode.window.activeTextEditor;
  	if (!activeEditor) {
		return;
  	}

	else{
		var firstLine = activeEditor.document.lineAt(0);
		var lastLine = activeEditor.document.lineAt(activeEditor.document.lineCount - 1);
		var nrange = new vscode.Range(firstLine.range.start, lastLine.range.end);
		var opp = new XmlWorker();
		var res = opp.XMLoperater(activeEditor.document.getText(nrange));
		//console.log(res);
		var opperate = new duplicateFinder(res);
		opperate.lookatval();
	}



	

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-vs-ex" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld-vs-ex.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('mama dont like no rakin an scrapin in here!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
