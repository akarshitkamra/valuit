/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.fillEmptyBlocks = false;
	config.removeDialogTabs = 'link:advanced';
	config.removeButtons = 'Save,Source,NewPage,ExportPdf,Print,Preview,Templates,Anchor,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Subscript,Superscript,NumberedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,Format,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About';
	
	config.enterMode = CKEDITOR.ENTER_BR;
	config.forcePasteAsPlainText = false; // default so content won't be manipulated on load
	config.basicEntities = true;
	config.entities = true;
	config.entities_latin = false;
	config.entities_greek = false;
	config.entities_processNumerical = false;
	config.fillEmptyBlocks = function (element) {
		return true; // DON'T DO ANYTHING!!!!!
	};
		
	config.allowedContent = true; // don't filter my data
};


// CKEDITOR.editorConfig = function( config ) {
// 	// Define changes to default configuration here.
// 	// For complete reference see:
// 	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

// 	// The toolbar groups arrangement, optimized for a single toolbar row.
// 	config.toolbarGroups = [
// 		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
// 		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
// 		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
// 		{ name: 'forms' },
// 		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
// 		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
// 		{ name: 'links' },
// 		{ name: 'insert' },
// 		{ name: 'styles' },
// 		{ name: 'colors' },
// 		{ name: 'tools' },
// 		{ name: 'others' },
// 		{ name: 'about' }
// 	];

// 	// The default plugins included in the basic setup define some buttons that
// 	// are not needed in a basic editor. They are removed here.
// 	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

// 	// Dialog windows are also simplified.
// 	config.removeDialogTabs = 'link:advanced';
// };
