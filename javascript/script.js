
//PWNCOUNT API STEPS

// create name spacing
var hackApp = {}

// create init function
hackApp.init = function(){
	hackApp.getHackInfo();
}

//make request
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


//put the variable from getHackInfo here
hackApp.displayInfo = function(items) {
	// $('#hackWork').empty();
	// console.log('testing2',items)
	items.forEach(function(item){
		//loop over every item returned from API
		if(item.IsVerified === true && item.AddedDate >= "2015-01-01" && item.PwnCount >= "1500000" || item.Title === "Yahoo") {
			var website = item.Title;
			var name = item.Description;
			var dataClasses = item.DataClasses;
			//add outline for adding it to index
			var nameElement = $('<button class="newsButton" id="siteNames">').text(website);
			var websiteElement = $('<p></p>').html(`<br><div class="url"><i class="fa fa-book" aria-hidden="true"></i></div><strong>Background Information:</strong> ` + name);
			// $('<div class="infoContainer></div>').html(items).append('.container')
			var dataElement = $('<p></p>').html("<br></br><strong>Stolen info:</strong> " + dataClasses + " <br></br>");
			// var dataElement = $('<p class="dataAttr">').html("<strong>Stolen info:</strong> " + dataClasses + "").hide();
			//create variable for what will be on page so add it later
			var pwnedElement = $('<div class="pwnedDiv"></div>').append(websiteElement, dataElement).hide();
			var nytElement = $('<div class="nytContainer"></div>').hide();
			var titleSanitized = item.Title.replace(/\s/g, '');
			var hackSheet = $('<div>').addClass('item').addClass('clearfix').addClass(titleSanitized).append(nameElement,nytElement, pwnedElement);
			//add to website
			$('#hackWork').append(hackSheet);

		}
	})

};

//NYT API STEPS
//create namespacing, nyt key, nyt url variables to reuse
var timesApp = {}
timesApp.key = 'b2649c169cdb439e9ebfb626605b499b';
timesApp.url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
// create a way to insert search params into nyt app https://api.jquery.com/jQuery.param/

//create function to return the information we want from nyt. The "news" parameter will change to pwn selection
timesApp.getNewsInfo = function(newsList){
	console.log(newsList);

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
			console.log(clips);

			var newsListSanitized = newsList.replace(/\s/g, '');
		
			if(clips.response.docs.length < 1 ) {

				$(`.${newsListSanitized} .nytContainer`).html(`<br></br><div class="url"><p><i class="fa fa-hand-paper-o" aria-hidden="true"></i><br><strong>Sorry, there are no current <i>NYT</i> stories that match ${newsListSanitized}.</strong></p>`).css()

			}

			else {


			var filteredByAbstract = clips.response.docs.filter(function(item) {
				console.log(item);
				return item.abstract !== null;
			});

			console.log(filteredByAbstract)
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
			console.log(addHeadline)
		
			$('.nytWebsite').append(clips.response.docs[0].web_url);
			$(`.${newsListSanitized} .nytContainer`).html(`<br><div class="url"><blockquote><p><i class="fa fa-newspaper-o" aria-hidden="true"></i><br><strong>${addHeadline}</strong><br></br></div></p><div class="snip"><p>${addSnippet}</p><a href="${addUrl}">Read the full of NYT story</a></div>`);
			console.log(addUrl);
		}

	})
};



//Start document ready!
$(function(){

//init request
hackApp.init();

function myFunction() {
newsList = website;
newsResults = dataClasses;
}

//click function
$('#hackWork').on('click', '.newsButton',function(){
	console.log('yo, this test')
	var company = $(this).text()
	timesApp.getNewsInfo(company)
	$(this).siblings('.nytContainer').slideToggle()
	$(this).siblings('.pwnedDiv').slideToggle();
	$(this).siblings('.pwnedDiv').css("font-size", "2rem");
});

//blink function
var questionMark = $(".blink");
var shown = true;
setInterval(toggle, 400);

function toggle() {
	if(shown) {
    questionMark.hide();
    shown = false;
	} else {
    questionMark.show();
    shown = true;
	}
}

//quiz button
$(".startQuiz").on("click", function(){
$(".standaloneQuote").fadeIn('slow');
$(".attribution").fadeIn('slow');

});

// scroll button
$(".scrollOne").on("click", function(){
$(".newsPargraphs").fadeIn('slow'); 

});

//count function
var n = 0;

$('#hackWork').on('click', '.newsButton',function(){
console.log("There's another one")
$("#hackWork").each(function() {
var update = $('.pwnedDiv').text()
n = n + 1;
console.log("There's two", n);
console.log("There's two", update);

$(".totalNumbers").text(n);

}); 

 $('.crunch').on('click', function(){
	 	$('.resultNumbers').hide();
	 	$('.totalNumbers').fadeIn();

	 });


//share button
$('.share').html(`<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Find%20your%20personal%20data%20online%20here%20http://bit.ly/2mqRq0j">Share your hacking data online</a>`)	

});

 }); 


// });





