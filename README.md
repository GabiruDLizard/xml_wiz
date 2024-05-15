# XML Duplicate Finder

This extension locates duplicates in xml files and displays the duplicated xml nodes in the console.

## Features

This extension locates duplicates in xml files and displays the duplicated xml nodes in the console. Useful especially for huge xml or HTMl files and displays them in collapsed json format.

example:

GIven an xml file like this:

<img src="promo-images/example-xml-1.png"/>
<img src="promo-images/example-xml-2.png"/>

By running the command 'Activate extent' in the command pallette, the extension responds with this message in a new webview window:

<img src="promo-images/example-xmlduplicates-4.png"/>

## Requirements

- vscode 1.78.0 and up
- macos, linux or windows
- npm

## Release Notes

### 1.0.0

Initial release of XML_WIZ:
This is my first extension. I made this to fix a personal and professional problem I kept having and to try my hand at something new. I will update and improve this as often as possible and especially if I missed something embarrassing.

### 1.0.3

Second Release of XML_WIZ:
Now the XML_WIZ duplicate finder compares each xml node as a whole instead of previously only comparing the attributes.