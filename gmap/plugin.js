/**
 * Plugin CKEditor GMap
 * Copyright (c) <2015> <Jacques Malgrange contacter@boiteasite.fr>
 * License MIT
 */
CKEDITOR.plugins.add('gmap',{
	requires:'widget',
	icons:'gmap',
	lang: 'en,fr',
	init:function(editor){
		CKEDITOR.dialog.add('gmapDialog',this.path+'dialogs/gmap.js');
		var lang=editor.lang.gmap;
		editor.widgets.add('gmap',{
			button:lang.title,
			template:'<iframe class="gmap" width="" height="" frameborder="0" scrolling="no" src=""></iframe>',
			requiredContent:'iframe(gmap)',
			dialog:'gmapDialog',
			upcast:function(element){return element.name=='iframe'&&element.hasClass('gmap');},
			init:function(){
				var wid=this.element.getAttribute('width'),hei=this.element.getAttribute('height'),loc=this.element.getAttribute('src'),i,f,t;
				if(wid)this.setData('wid',wid);
				if(hei)this.setData('hei',hei);
				if(loc){
					i=loc.search('q=');f=loc.search('num=');if(i!=-1&&f!=-1)this.setData('loc',loc.substring(i+2,f-1));
					i=loc.search('&t=');f=loc.search('ie=');if(i!=-1&&f!=-1)t=loc.substring(i+3,f-1);
					i=loc.search('&z=');f=loc.search('output=');if(i!=-1&&f!=-1)this.setData('zoo',loc.substring(i+3,f-1));
					if(t='k')this.setData('map',lang.satellite);
					else if(t='h')this.setData('map',lang.hybrid);
					else if(t='p')this.setData('map',lang.terrain);
					else this.setData('map',lang.normal);
				}
			},
			data:function(){
				if(this.data.wid=='')this.element.setAttribute('width','360');
				else	this.element.setAttribute('width',this.data.wid);
				if(this.data.hei=='')this.element.setAttribute('height','240');
				else	this.element.setAttribute('height',this.data.hei);
				if(this.data.map==lang.satellite)t='k';
				else if(this.data.map==lang.hybrid)t='h';
				else if(this.data.map==lang.terrain)t='p';
				else t='m';
				if(this.data.loc!='')this.element.setAttribute('src','//maps.google.com/maps?q='+this.data.loc+'&num=1&t='+t+'&ie=UTF8&z='+this.data.zoo+'&output=embed');
			}
		});
	}
});
