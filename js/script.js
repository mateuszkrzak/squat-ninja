$(function () {

	$("#worker a:contains('Pracownicy')").parent().addClass('active');
	$("#about a:contains('O nas')").parent().addClass('active');
	$("#news a:contains('Aktualności')").parent().addClass('active');

});

$(function () {
	$('#workerTabMenu a:first').tab('show');
	$('#workerTabMenu').tabCollapse({
		tabsClass: 'hidden-sm hidden-xs',
		accordionClass: 'visible-sm visible-xs'
	});
});

