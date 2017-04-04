
//PWNCOUNT API STEPS

var hackApp = {}

hackApp.init = function(){
	hackApp.getHackInfo();
}

hackApp.getHackInfo = function(query) {
	$.ajax({
		url: 'https://haveibeenpwned.com/api/v2/breaches',
		method: 'GET',
		dataType: 'json',
		data: {
			format: 'json',	
			q: query
		}
	}).then(function(news){
		hackApp.displayInfo(news);

	})
};

hackApp.displayInfo = function(items) {
	items.forEach(function(item){
		if(item.IsVerified === true && item.AddedDate >= "2015-01-01" && item.PwnCount >= "1500000" || item.Title === "Yahoo") {
			var website = item.Title;
			var name = item.Description;
			var dataClasses = item.DataClasses;
			var nameElement = $('<button class="newsButton" id="siteNames">').text(website);
			var websiteElement = $('<p></p>').html(`<br><div class="url"><i class="fa fa-book" aria-hidden="true"></i></div><strong>Background Information:</strong> ` + name);
			var dataElement = $('<p></p>').html("<br></br><strong>Stolen info:</strong> " + dataClasses + " <br></br>");
			var pwnedElement = $('<div class="pwnedDiv"></div>').append(websiteElement, dataElement).hide();
			var nytElement = $('<div class="nytContainer"></div>').hide();
			var titleSanitized = item.Title.replace(/\s/g, '');
			var hackSheet = $('<div>').addClass('item').addClass('clearfix').addClass(titleSanitized).append(nameElement,nytElement, pwnedElement);
			$('#hackWork').append(hackSheet);

		}
	})

};

var timesApp = {}
timesApp.key = 'b2649c169cdb439e9ebfb626605b499b';
timesApp.url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

timesApp.getNewsInfo = function(newsList){
	$.ajax({
		url: timesApp.url,
		method: 'GET',
		dataType: 'json',
		data: {
			format: 'json',
			'api-key': timesApp.key,
			q: newsList,
			fq: 'breach' && 'hack'
			// abstract: newsList
								
		},

		}).then(function(clips){
			var newsListSanitized = newsList.replace(/\s/g, '');
			if(clips.response.docs.length < 1 ) {
				$(`.${newsListSanitized} .nytContainer`).html(`<br></br><div class="url"><p><i class="fa fa-hand-paper-o" aria-hidden="true"></i><br><strong>Sorry, there are no current <i>NYT</i> stories that match ${newsListSanitized}.</strong></p>`).css()

			}

			else {
			var filteredByAbstract = clips.response.docs.filter(function(item) {
				return item.abstract !== null;
			});
			var addAbstract;
			if(filteredByAbstract.length > 0) {
				addAbstract = filteredByAbstract[0].abstract

			} else {
				addAbstract = ''
			};
			
			var addHeadline = clips.response.docs[0].headline.main;
			var addLeadParagraph = clips.response.docs[0].lead_paragraph;
			var addUrl = clips.response.docs[0].web_url;
			var addSnippet = clips.response.docs[0].snippet;
		
			$('.nytWebsite').append(clips.response.docs[0].web_url);
			$(`.${newsListSanitized} .nytContainer`).html(`<br><div class="url"><blockquote><p><i class="fa fa-newspaper-o" aria-hidden="true"></i><br><strong>${addHeadline}</strong><br></br></div></p><div class="snip"><p>${addSnippet}</p><a href="${addUrl}">Read the full of NYT story</a></div>`);
		}

	})
};

$(function(){



//LINKS
$('.intro').on('click', function(){
	$(this).parents('section').hide()
	$('header').fadeIn();
	// $('.introWrapper').show();
});

$('.stand').on('click', function(){
	$(this).parents('section').hide()
	$('.quoteSection').fadeIn();
	// $('.introWrapper').show();
});

$('.why').on('click', function(){
	$(this).parents('section').hide()
	$('#whyItMattersSection').fadeIn();
	// $('.introWrapper').show();
});

$('.how').on('click', function(){
	$(this).parents('section').hide()
	$('#howToProtectSection').fadeIn();
	// $('.introWrapper').show();
});

$('.hackedInfo').on('click', function(){
	$(this).parents('section').hide()
	$('#hackedInfoSection').fadeIn();
	// $('.introWrapper').show();
});

///////////////////SEPERATE SECTION

$('#why').on('click', function(){
	$('.quoteSection').hide();
	$('.whyItMattersSection').fadeIn();
});

$('#how').on('click', function(){
	$('.quoteSection').hide();
	$('.howToProtectSection').fadeIn();
});

$('#hackedInfo').on('click', function(){
	$('.quoteSection').hide();
	$('.hackWork').fadeIn();
});

//CHEVRON SECTION

$('#introChevron').on('click', function(){
	$('header').hide();
	$('.quoteSection').fadeIn();
});

$('#quoteChevron').on('click', function(){
	$('.quoteSection').hide();
	$('.whyItMattersSection').fadeIn();
});

$('#whyItMattersChevron').on('click', function(){
	$('.whyItMattersSection').hide();
	$('.demoSection').fadeIn();
});

$('#demoChevron').on('click', function(){
	$('.demoSection').hide();
	$('.howToProtectSection').fadeIn();
});

$('#howToProtectChevron').on('click', function(){
	$('.howToProtectSection').hide();
	$('.hackedInfoSection').fadeIn();
});

//////////////// POPOVER SECTION

$('[data-toggle="popover"]').fadeIn().popover();  


///TYPEWRITER SECTION

function setupTypewriter(t) {
        var HTML = t.innerHTML;

        t.innerHTML = "";

        var cursorPosition = 0,
            tag = "",
            writingTag = false,
            tagOpen = false,
            typeSpeed = 25,
        	tempTypeSpeed = 0;

        var type = function() {
        
            if (writingTag === true) {
                tag += HTML[cursorPosition];
            }

            if (HTML[cursorPosition] === "<") {
                tempTypeSpeed = 0;
                if (tagOpen) {
                    tagOpen = false;
                    writingTag = true;
                } else {
                    tag = "";
                    tagOpen = true;
                    writingTag = true;
                    tag += HTML[cursorPosition];
                }
            }
            if (!writingTag && tagOpen) {
                tag.innerHTML += HTML[cursorPosition];
            }
            if (!writingTag && !tagOpen) {
                if (HTML[cursorPosition] === " ") {
                    tempTypeSpeed = 0;
                }
                else {
                    tempTypeSpeed = (Math.random() * typeSpeed) + 40;
                }
                t.innerHTML += HTML[cursorPosition];
            }
            if (writingTag === true && HTML[cursorPosition] === ">") {
                tempTypeSpeed = (Math.random() * typeSpeed) + 40;
                writingTag = false;
                if (tagOpen) {
                    var newSpan = document.createElement("span");
                    t.appendChild(newSpan);
                    newSpan.innerHTML = tag;
                    tag = newSpan.firstChild;
                }
            }

            cursorPosition += 1;
            if (cursorPosition < HTML.length - 1) {
                setTimeout(type, tempTypeSpeed);
            }

        };

        return {
            type: type
        };
    }

    var typer = document.getElementById('typewriter');

    typewriter = setupTypewriter(typewriter);

    typewriter.type();

    });


/////// API SECTION

hackApp.init();

function myFunction() {
newsList = website;
newsResults = dataClasses;
}

$('.twitter').on('click', function(){
$('.twitter').html(`<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Check%20out%20this%20year's%20hacked%20sites%20">Share your fortune on Twitter</a>`)
})	 

$('#hackWork').on('click', '.newsButton',function(){
	var company = $(this).text()
	timesApp.getNewsInfo(company)
	$(this).siblings('.nytContainer').slideToggle()
	$(this).siblings('.pwnedDiv').slideToggle();
	$(this).siblings('.pwnedDiv').css("font-size", "2rem");
});

// var questionMark = $(".blink");
// var shown = true;
// setInterval(toggle, 400);

// function toggle() {
// 	if(shown) {
//     questionMark.hide();
//     shown = false;
// 	} else {
//     questionMark.show();
//     shown = true;
// 	}
// }

$(".startQuiz").on("click", function(){
$(".standaloneQuote").fadeIn('slow');
$(".attribution").fadeIn('slow');

});

$(".scrollOne").on("click", function(){
$(".newsPargraphs").fadeIn('slow'); 

});

var n = 0;

$('#hackWork').on('click', '.newsButton',function(){
$("#hackWork").each(function() {
var update = $('.pwnedDiv').text()
n = n + 1;
$(".totalNumbers").text(n);

}); 

 $('.crunch').on('click', function(){
	 	$('.resultNumbers').hide();
	 	$('.totalNumbers').fadeIn();

	 });

// $('.share').html(`<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Find%20your%20personal%20data%20online%20here%20http://bit.ly/2mqRq0j">Share your hacking data online</a>`)	

// });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

 }); 







