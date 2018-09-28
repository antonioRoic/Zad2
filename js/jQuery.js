jQuery(document).ready(function($) {

	var slider_images = ["images/slide.png", "images/slide.png", "images/slide.png"];

	loadContent();

	var menuList = $("nav > ul > li");


	var slider = $(".slider");
	slider = new Slider(slider);
	$(".slider span").on("click", function() {
		slider.changeBackground($(this));
	});

	function Slider(slider) {

		this.changeBackground = function(span) {

			var active = slider.find("span.active");

			if (!span.hasClass("active")) {
				slider.fadeOut(300, function() {
					slider.css("background-image", "url(" + slider_images[span.index()] + ")")
				}).fadeIn(300);
				active.removeClass("active");
				span.addClass("active");
			}
		};
	};

	
	if ($(window).innerWidth() >= 769) menuList.addClass("hoverDesktop");
	else menuList.addClass("clickMobile");
	
	$(window).on("resize", function() {
		if ($(window).innerWidth() >= 769) menuList.removeClass("clickMobile").addClass("hoverDesktop");
		else menuList.removeClass("hoverDesktop").addClass("clickMobile");
	});
	
	$(".mobile-menu, .mobile-close").on("click", function() {
		$(".nav-wrapper").toggleClass("sidebar-nav");
		$(".mobile-nav").toggle();
	});
	
	menuList.on("click", function() {
		menu = $(this);
		if(menu.hasClass("clickMobile")) menu.has("ul").toggleClass("slide");
	});


	function loadContent() {

		var template = $(".articles-template").html();
		$.ajax({
			url: "articles.json",
			type: "GET",
			dataType: "json",
			
			success: function(response) {
				$.each(response.data, function(index, element) {
					$(".articles-wrapper").append((Mustache.render(template, element)));				
				});
			},

			error: function() {
				console.log("error");
			}

		});
	};


	$("#contact-form").on("submit", (function(event) {
		
		event.preventDefault();

		var contact = $("#contact");
		var	email = $("#email");
		var	message = $("#message");

		var valContact = contact.val();
		var	valEmail = email.val();
		var	valMessage = message.val();


		if (valContact && valEmail && valMessage)
		{
			var contactPerson = { "contact" : contact.content, "email" : email.content, "message" : message.content };

			$.ajax({
				url: "http://www.locastic.com/api/v1/fe-dev",
				type: "POST",
				data: contactPerson,
				success: function(response) {
					alert("Validacija uspješna!");
				},
				error: function(xhr, statusText, status) {
					console.log("Status greške: " + statusText);
				}
			});
		}

	}));

	
});