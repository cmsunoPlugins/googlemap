//
// CMSUno
// Plugin Googlemap
//
UconfigNum++;

CKEDITOR.plugins.addExternal('gmap',UconfigFile[UconfigNum-1]+'/../gmap/');
CKEDITOR.editorConfig = function(config){
	config.extraPlugins += ',gmap';
	config.toolbarGroups.push('gmap');
	config.extraAllowedContent += '; iframe[*](gmap)';
	if(UconfigFile.length>UconfigNum)config.customConfig=UconfigFile[UconfigNum];
};
