// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const XmlWorker = require('./xmlWorker');
const RecursorAgent = require('./recursorAgent');
const xml2js = require('xml2js');

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
		xml2js.parseString(res, function (err, results) {
			var recstr = new RecursorAgent();
			recstr.duppyFinder(results);
			if(recstr.duplicates.length > 0){
				console.log('there are duplicates in this xml document:');
				for(let i = 0; i < recstr.duplicates.length; i++){
					console.log(recstr.duplicates[i]);
				}
			}
			else{
				console.log('there are no duplicates in this xml');
			}
		});
	}

	
	let disposable = vscode.commands.registerCommand('helloworld-vs-ex.helloWorld', function () {
		vscode.window.showInformationMessage('searching for duplicates :)');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
