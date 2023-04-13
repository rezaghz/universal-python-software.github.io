// --------------------------------------------------------------------------------
// clsAds
var clsAds = clsAds || {};
clsAds = {
	iWw: 0,
	iWh: 0,
	iAdsHead: 0,
	iAdsTail: 0,
};

clsAds.fnInit = function() {
	clsAds.iWw = $(window).width();
	clsAds.iWh = $(window).height();
	
	//下部固定オーバーレイ広告のタグが存在し、画面が縦持ちの場合
	clsAds.iAdsHead = 0;
	if ($('#div_adshead').length > 0 && $(window).width() < $(window).height()) {
		clsAds.iAdsHead = Number($('#div_adshead').attr('data-height'));
		if ($('#div_adshead').attr('data-w100') == 'true') {
			let iAdsW = Number($('#div_adshead').attr('data-width'));
			clsAds.iAdsHead = clsAds.iAdsHead / iAdsW * clsAds.iWw;
		}
	}
	
	//上部バナー広告のタグが存在し、画面が縦持ちの場合
	clsAds.iAdsTail = 0;
	if ($('#div_adstail').length > 0 && $(window).width() < $(window).height()) {
		clsAds.iAdsTail = Number($('#div_adstail').attr('data-height'));
		if ($('#div_adstail').attr('data-w100') == 'true') {
			let iAdsW = Number($('#div_adstail').attr('data-width'));
			clsAds.iAdsTail = clsAds.iAdsTail / iAdsW * clsAds.iWw;
		}
	}
}

clsAds.fnStart = function(fnStartCanvas,iAdjustTop,elmCv) {
	if (elmCv == undefined) {
		elmCv = m_elmCv;
	}
//console.log(elmCv);
	
	if (clsAds.iAdsHead > 0) {
		//広告がある場合は初期スクロール時に開始
		$(window).on('scroll',function () {
			$(window).off('scroll');
			
			let iWindowY = $(window).scrollTop();
			$('body,html').animate({ scrollTop: iWindowY + elmCv.getBoundingClientRect().top + iAdjustTop }, 500, 'swing');
			
			setTimeout(function() {
				clsAds.iWw = $(window).width();
				clsAds.iWh = $(window).height();
				fnStartCanvas();
			},500);
		});
	} else {
		//広告がない場合はすぐに開始
		setTimeout(function() {
			clsAds.iWw = $(window).width();
			clsAds.iWh = $(window).height();
			fnStartCanvas();
		},1000);
	}
}

