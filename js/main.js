
var storyArray = [];

function tshirtToNumber(tshirt){
	switch (tshirt) {
		case "S":
			return 1;
		case "M":
			return 2;
		case "L":
			return 3;
		case "XL":
			return 4;
	}
	return parseInt( tshirt );
}

function showPanda(){
	$('#panda').show();
	$('#panda').css("bottom", "-300px");
	$('#panda').animate({bottom: "0px"});
}

function chart() {
	google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(drawChart);

    function daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
    }

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('string', 'Resource');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');

var dateNow = new Date();
for( var i = 0; i < storyArray.length; i++ ) {
	var story = storyArray[i]
	var depen = null;
	if( i != 0 ) {
		//depen = i-1 + ""
	}

	var dat = new Date();
  	dat.setDate(dateNow.getDate() + i);
  	var dat2 =  new Date();
  	dat2.setDate(dateNow.getDate() + i + 1);

	data.addRow( [i+ 1 + "", story.name,(i%3) + "!", dat,dat2, tshirtToNumber(story.value), 0, depen])

}
/*
      data.addRows([
        ['Research', 'Find sources',
         new Date(2015, 0, 1), new Date(2015, 0, 5), null,  100,  null],
        ['Write', 'Write paper',
         null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
        ['Cite', 'Create bibliography',
         null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
        ['Complete', 'Hand in paper',
         null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
        ['Outline', 'Outline paper',
         null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
      ]);
*/

      var options = {
        height: 475,
        width: 1000
      };

      var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
}

$(document).ready(function(){
	$("#done_adding").click(function() {
		chart();
		$(".estimation").hide();	
		$('#chart_div').height( 475 );
		$('#done_adding').hide();
		$('#panda form').hide();
		$('#panda #waterfall_form4').show();

		showPanda();
		
	
	})

	$('.agile').click(function(){
		$('.mode').hide();
		$('.body_content').show();
	})

	$('#panda input').click(function(){
		$('#panda').fadeOut({complete: function() {$(this).find('.bugger_off').attr('checked', false);} })
	})

	$('#budget').change(function() {
		if( this.value == 'fts' ) {
			$('#panda form').hide();
			$('#panda #waterfall_form').show();
			
			showPanda();
		}
	})


	$('#unit').change(function() {
		if( this.value == 'seconds' ) {
			$('#panda form').hide();
			$('#panda #waterfall_form2').show();
			
			showPanda();
		}
	})


	$('#calculation_type').change(function() {
		if( this.value == 'insane' ) {
			$('#panda form').hide();
			$('#panda #waterfall_form3').show();
			
			showPanda();
		}
	})

	
	$('#unit').change(function(){
		$('#estimate_value').html('');
		if(this.value == "points"){
			$('#estimate_value').html($('#number_estimate').html());
		}else if (this.value == "size" ) {
			$('#estimate_value').html($('#tshirt_estimate').html());
		} else {
			$('#estimate_value').html($('#number_estimate').html());
		}
		$('#estimate_holder').show();
	})
	$('#add_button').click(function(event){
		event.preventDefault();
		var nameStory = $('#nameStory').val();
		var unit = $('#unit option:checked').val();
		var value; 
		if(unit == "points"){
			value = $('#points_val').val();
		}else if(unit == "size"){
			value = $('#tshirt_val').val();
		} else {
			value = $('#points_val').val();
		}
		$('#added_stories tbody').append('<tr><td>' + nameStory + '</td><td>' + value + '</td><td>' + unit + '</td></tr>');
		$('#nameStory').val('');
		$('#unit').val('');
		$('#estimate_holder').hide();
		$('#nameStory').focus();
		storyArray.push( {
			name: nameStory,
			value: value,
			unit: unit
		})
	});
	$('#show_add_form').click(function(event){
		event.preventDefault();
		$('#add_story_form').fadeIn(200);
	});
});
