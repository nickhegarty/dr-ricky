$(document).ready(function(){
	$('.agile').click(function(){
		$('.mode').hide();
		$('.body_content').show();
	})
	$('#unit').change(function(){
		$('#estimate_value').html('');
		if(this.value == "points"){
			$('#estimate_value').html($('#number_estimate').html());
		}else{
			$('#estimate_value').html($('#tshirt_estimate').html());
		}
		$('#estimate_holder').show();
	})
	$('#add_button').click(function(event){
		event.preventDefault();
		var numStories = $('#numStories').val();
		var unit = $('#unit option:checked').val();
		var value; 
		if(unit == "points"){
			value = $('#points_val').val();
		}else{
			value = $('#tshirt_val').val();
		}
		$('#added_stories tbody').append('<tr><td>' + numStories + '</td><td>' + value + '</td><td>' + unit + '</td></tr>');
		$('#numStories').val('');
		$('#unit').val('');
		$('#estimate_holder').hide();
		$('#numStories').focus();
	});
	$('#show_add_form').click(function(event){
		event.preventDefault();
		$('#add_story_form').fadeIn(200);
	});
});
