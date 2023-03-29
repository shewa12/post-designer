jQuery(function ($) {
	var elem = $(".pd-slick-slider");

	if (!elem) {
		return;
	}

	var settings = {
		slidesToShow: Number(elem.attr("data-slides-to-show")),
		slidesToScroll: Number(elem.attr("data-slides-to-scroll")),
		initialSlide: Number(elem.attr("data-initial-slide")),
		dots: Boolean(elem.attr("data-dots")),
		infinite: Boolean(elem.attr("data-infinite")),
		autoplay: Boolean(elem.attr("data-autoplay")),
		arrows: Boolean(elem.attr("data-arrows")),
		centerMode: Boolean(elem.attr("data-center-mode")),
		focusOnSelect: Boolean(elem.attr("data-focus-on-select")),
		rtl: Boolean(elem.attr("data-rtl")),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	$(".pd-slick-slider").slick(settings);
});
		// dots: true,
		// infinite: true,
		// autoplay: true,
		// speed: 300,
		// slidesToShow: 2,
		// slidesToScroll: 2,
		// arrows: true,
		// responsive: [
		//   {
		//     breakpoint: 1024,
		//     settings: {
		//       slidesToShow: 3,
		//       slidesToScroll: 3,
		//       infinite: true,
		//       dots: true
		//     }
		//   },
		//   {
		//     breakpoint: 600,
		//     settings: {
		//       slidesToShow: 2,
		//       slidesToScroll: 2
		//     }
		//   },
		//   {
		//     breakpoint: 480,
		//     settings: {
		//       slidesToShow: 1,
		//       slidesToScroll: 1
		//     }
		//   }
		// ]