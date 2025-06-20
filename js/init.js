jQuery(document).ready(function(){
	"use strict";

	deltaplay_tm_menu_width();
	deltaplay_tm_cursor();
	deltaplay_tm_imgtosvg();
	deltaplay_tm_data_images();
	deltaplay_tm_contact_form();

	deltaplay_tm_trigger_opener();
	hashtag();

	jQuery(window).load('body', function(){
		deltaplay_tm_my_load();
	});

	jQuery(window).on('resize', function(){
		deltaplay_tm_hero_height();
	});

});

// ------------------------------------------------
// -------------------  ANCHOR --------------------
// ------------------------------------------------

jQuery('.anchor_nav').onePageNav();

// -----------------------------------------------------
// ---------------   HERO HEIGHT    --------------------
// -----------------------------------------------------

function deltaplay_tm_hero_height(){

	"use strict";

	var H 		= $('.deltaplay_tm_hero .main_menu').outerHeight();
	var WW		= jQuery(window).width();
	var topbarH = $('.deltaplay_tm_topbar').height();
	if(WW >= 1040){
		$('.deltaplay_tm_hero .main_info').css({minHeight: 'calc(100vh - '+H+'px)',paddingTop:topbarH+'px'});
	}
}


// -----------------------------------------------------
// ---------------   MENU WIDTH   ----------------------
// -----------------------------------------------------

function deltaplay_tm_menu_width(){

	"use strict";

	var ww	= jQuery(window).width();
	var btn	= jQuery('.deltaplay_tm_hero .main_menu ul li a');

	btn.on('mouseenter',function(){
		var element 	= jQuery(this);
		var li			= element.closest('li');
		if(li.hasClass('active') || li.hasClass('entered')){return false;}
		li.closest('ul').children().removeClass('entered');
		li.addClass('entered');
		var elWidth		= li.outerWidth();
		var textWidth	= li.find('span').outerWidth();
		li.css({width: elWidth+textWidth+'px'});
	}).on('mouseleave',function(){
		var element 	= jQuery(this);
		var li			= element.closest('li');
		var allLi		= li.closest('ul').children();
		var fixedLi		= li.closest('ul').children('.fixed');
		var activeLi	= li.closest('ul').children('.active');
		allLi.removeClass('entered').css({width:'135px'});
		if(ww <= 1400){
			allLi.removeClass('entered').css({width:'95px'});
		}

		if(activeLi.length){
			var elWidth		= 135;
			if(ww <= 1400){
				elWidth = 95;
			}
			var textWidth	= activeLi.find('span').outerWidth();
			activeLi.removeClass('fixed').addClass('active').css({width: elWidth+textWidth+'px'});
		}
	});

	btn.on('click',function(){
		var element 	= jQuery(this);
		var li			= element.closest('li');
		var href		= element.attr('href');
		if(li.hasClass('active') && !li.hasClass('entered')){
			return false;
		}
		li.addClass('active fixed');
		var mainMenu	= element.closest('.main_menu');

		if(ww <= 1040){
			$('html, body').animate({
				scrollTop: $('.deltaplay_tm_mainpart').offset().top - 30
			}, 1000);
		}else{
			$('html, body').animate({
				scrollTop: mainMenu.offset().top - 30
			}, 1000);
		}


		li.siblings().removeClass('active').css({width:'135px'});
		if(ww <= 1400){
			li.siblings().removeClass('active').css({width:'95px'});
		}
		$('.deltaplay_tm_main_section.active').removeClass('active');
		jQuery('.deltaplay_tm_hero .background_shape').addClass('opened');
		$(href).addClass('active');

		if(!li.hasClass('entered')){
			var elWidth		= li.outerWidth();
			var textWidth	= li.find('span').outerWidth();
			li.css({width: elWidth+textWidth+'px'});
		}

		return false;
	});

	jQuery('.deltaplay_tm_hero .main_menu ul li.active').each(function(){
		var element 	= jQuery(this);
		var elWidth		= element.outerWidth();
		var textWidth	= element.find('span').outerWidth();
		var href		= element.find('a').attr('href');
		element.css({width: elWidth+textWidth+'px'});
		$(href).addClass('active');
	});
}


// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function deltaplay_tm_preloader(){

	"use strict";

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');

	if (!isMobile) {
		setTimeout(function() {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function() {
			preloader.remove();
		}, 2000);

	} else {
		preloader.remove();
	}
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function deltaplay_tm_my_load(){

	"use strict";

	var speed	= 500;
	setTimeout(function(){deltaplay_tm_preloader();},speed);
	setTimeout(function(){jQuery('body').addClass('opened');},speed+2000);
}

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function deltaplay_tm_cursor(){

    "use strict";

	var myCursor	= jQuery('.mouse-cursor');

	if(myCursor.length){
		if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n, i = 0,
            o = !1;
        window.onmousemove = function (s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
        }, $("body").on("mouseenter", "a,.deltaplay_tm_topbar .trigger, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
        }), $("body").on("mouseleave", "a,.deltaplay_tm_topbar .trigger, .cursor-pointer", function () {
            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
        }), e.style.visibility = "visible", t.style.visibility = "visible"
    }
	}
}

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function deltaplay_tm_imgtosvg(){

	"use strict";

	jQuery('img.svg').each(function(){

		var jQueryimg 		= jQuery(this);
		var imgClass		= jQueryimg.attr('class');
		var imgURL			= jQueryimg.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function deltaplay_tm_data_images(){

	"use strict";

	var data			= jQuery('*[data-img-url]');

	data.each(function(){
		var element			= jQuery(this);
		var url				= element.data('img-url');
		element.css({backgroundImage: 'url('+url+')'});
	});
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function deltaplay_tm_contact_form(){

	"use strict";

	jQuery(".contact_form #send_message").off().on('click', function(){

		var name 		= jQuery(".contact_form #name").val();
		var email 		= jQuery(".contact_form #email").val();
		var message 	= jQuery(".contact_form #message").val();
		var subject 	= jQuery(".contact_form #subject").val();
		var success     = jQuery(".contact_form .returnmessage").data('success');

		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields
		if(name===''||email===''||message===''){

			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else{
			// Returns successful data submission message when the entered information is stored in database.
			jQuery.post("modal/contact.php",{ ajax_name: name, ajax_email: email, ajax_message:message, ajax_subject: subject}, function(data) {

				jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


				if(jQuery(".contact_form .returnmessage span.contact_error").length){
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
				}else{
					jQuery(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>");
					jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
				}

				if(data===""){
					jQuery("#contact_form")[0].reset();//To reset form fields on success
				}

			});
		}
		return false;
	});
}

// -----------------------------------------------------
// --------------------    WOW JS    -------------------
// -----------------------------------------------------

 new WOW().init();


// -----------------------------------------------------
// ---------------   TRIGGER MENU    -------------------
// -----------------------------------------------------

function deltaplay_tm_trigger_opener(){

	"use strict";

	var audio1			= jQuery('#audio1');
	var audio2			= jQuery('#audio2');
	var hamburger 		= jQuery('.deltaplay_tm_extra_demo .deltaplay_tm_topbar .trigger .hamburger');
	var menu			= jQuery('.deltaplay_tm_topbar .wrapper .menu');

	hamburger.on('click',function(){
		var element 	= jQuery(this);

		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			audio1[0].play();
			menu.removeClass('opened');
		}else{
			element.addClass('is-active');
			audio2[0].play();
			menu.addClass('opened');
		}
	});
}

// -----------------------------------------------------
// ---------------   MENU WIDTH NEW   ------------------
// -----------------------------------------------------

function deltaplay_tm_menu_width_action(element,action){
	"use strict";
	var ww	= jQuery(window).width();


	// action active is mouseenter and was used in onepagenav for current item (on scroll)

	if(action === 'active'){
		var li			= element.closest('li');
		if(li.hasClass('current') || li.hasClass('entered')){return false;}
		li.closest('ul').children().removeClass('entered');
		li.addClass('entered');
		var elWidth		= li.outerWidth();
		var textWidth	= li.find('span').outerWidth();
		li.css({width: elWidth+textWidth+'px'});
	}else{
		var li			= element.closest('li');
		var allLi		= li.closest('ul').children();
		var fixedLi		= li.closest('ul').children('.fixed');
		var activeLi	= li.closest('ul').children('.current');
		allLi.removeClass('entered').css({width:'70px'});
		if(ww <= 1400){
			allLi.removeClass('entered').css({width:'50px'});
		}

		if(activeLi.length){
			var elWidth		= 70;
			if(ww <= 1400){
				elWidth = 50;
			}
			var textWidth	= activeLi.find('span').outerWidth();
			activeLi.removeClass('fixed').addClass('current').css({width: elWidth+textWidth+'px'});
		}
	}

}


function hashtag(){
	"use strict";
	var ccc 			= $('.deltaplay_tm_topbar .wrapper .menu .ccc');
	var element 		= $('.deltaplay_tm_topbar .wrapper .menu .active a');
	$('.deltaplay_tm_topbar .wrapper .menu a').on('mouseenter',function(){
		var e 			= $(this);
		currentLink(ccc,e);
	});
	$('.deltaplay_tm_topbar .wrapper .menu').on('mouseleave',function(){
		element 		= $('.deltaplay_tm_topbar .wrapper .menu .active a');
		currentLink(ccc,element);
		element.parent().siblings().removeClass('mleave');
	});
	currentLink(ccc,element);

}

function currentLink(ccc,e){
	"use strict";
	if(!e.length){return false;}
	var left 		= e.offset().left;
	var width		= e.outerWidth();
	var menuleft 	= $('.deltaplay_tm_topbar .wrapper .menu').offset().left;
	e.parent().removeClass('mleave');
	e.parent().siblings().addClass('mleave');
	ccc.css({left: (left-menuleft) + 'px',width: width + 'px'});

}

// -------------------------------------------------
// ---------   Check email  ---------------
// -------------------------------------------------
function showModal(message) {
	document.getElementById('modalMessage').innerText = message;
	document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
	document.getElementById('modal').style.display = 'none';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', function(e) {
	if (e.target === this) closeModal();
});

function checkEmail(){
	event.preventDefault();
	const email = $('#email-form input')[0]?.value;
	const pass = $('#email-form input')[1]?.value;

	if (email.trim().length === 0 || pass.trim().length === 0) {
		showModal('Поля логин и пароль не должны быть пустыми!');
		return false;
	}

	if (email.trim().toLowerCase() !== 'annagrace@deltaplay.ru') {
		showModal('Указанный логин не существует');
		return false;
	} else if (pass.trim().length !== 9) {
		showModal('Пароль должен быть 9 символов');
		return false;
	} else if (pass.trim() !== '14R522OE!') {
		showModal('Неверный пароль');
		return false;
	} else {
		window.location.href = 'mail.html';
		return false;
	}
}


