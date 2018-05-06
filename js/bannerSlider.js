function BannerSlider (params){
	this.url = params && params.urlJsonBanner ? params.urlJsonBanner : './jsonSlider.json';
	var id_parent = params && params.idElem ? params.idElem : '.banner';
	this.parent = document.querySelector(id_parent)
	console.log(this.parent)
	this.index_data = -1;
	this.time_banner = 5000
	this.searchAllElem()
	this.loadJson()	
}
BannerSlider.prototype = {
	searchAllElem: function(){
		this.objElem = {
			elemTitle: this.parent.querySelector('.banner-title'),
			elemSubTitle: this.parent.querySelector('.banner-subtitle'),
			btnBanner: this.parent.querySelector('.btn-banner')
		}
	},
	loadJson: function(){
		console.log('loadJson')
		var xhr = new XMLHttpRequest();
		var self = this;
		xhr.overrideMimeType("application/json");  
		xhr.open('GET', this.url, true);

		xhr.send(null);

		xhr.onreadystatechange = function() {
			if (this.readyState != 4) return;

			// по окончании запроса доступны:
			// status, statusText
			// responseText, responseXML (при content-type: text/xml)

			if (this.status != 200) {
			// обработать ошибку
			// alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
			return;
			}
			
			var json = JSON.parse(this.responseText)
			self.setBanners(json)

		// получить результат из this.responseText или this.responseXML
		}
	},
	animationBanner: function(){
		var self = this;

		setInterval(function(){
			var num = (self.index_data + 1)%self.json.length
			
			self.updateBanner(num)
		}, self.time_banner)
	},
	updateBanner: function(num){
		this.index_data = num;
		this.setInfoBanner();
		this.showBanner();
		console.log('updateBanner')

		setTimeout(this.hideBanner.bind(this), this.time_banner - 1000)
	},
	setBanners: function (json){
		console.log('setBanners', json)
		this.json = json;
		this.updateBanner(0);
		this.animationBanner()
	},
	setInfoBanner: function() {
		console.log('setInfoBanner')
		var data = this.json[this.index_data];
		if(data.title){
			this.objElem.elemTitle.innerHTML = data.title
			this.objElem.elemTitle.style.display = 'block'
		} else {
			this.objElem.elemTitle.style.display = 'none'
		}
		
		if(data.subtitle){
			this.objElem.elemSubTitle.innerHTML = data.subtitle
			this.objElem.elemSubTitle.style.display = 'block'
		} else {
			this.objElem.elemSubTitle.style.display = 'none'
		}

		if(data.urlbutton){
			this.objElem.btnBanner.href = data.urlbutton
			this.objElem.btnBanner.style.display = 'inline-block'
		} else {
			this.objElem.btnBanner.style.display = 'none'
		}
	},
	delInfoBanner: function(data) {
		console.log('delInfoBanner')
		this.objElem.elemTitle.innerHTML = ''
		this.objElem.elemSubTitle.innerHTML = ''
		this.objElem.btnBanner.href = ''
	},
	showBanner: function(){
		console.log('showBanner')
		this.parent.classList.add('show')
	},
	hideBanner: function(){
		console.log('hideBanner')
		this.parent.classList.remove('show')
	}
};
window.BannerSlider = BannerSlider