// Accion para el navbar cuando el scroll es de cierto tamaño para que cambie su estilo
$(document).scroll(function () {
	if ($(document).scrollTop() >= 80) {
		$("#menuModal").addClass('bg-black');
	} else {
		$("#menuModal").removeClass('bg-black');
	}
});

//Para hacer scroll target al id con 
$(document).ready(function () {
	$('a[href^="#sll"]').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 1500, 'swing', function () {
			window.location.hash = target;
		});
	});
});


$(document).on("click", "#location", function (evt) {
	evt.preventDefault();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocationInfo);
	}
});

function displayLocationInfo(position) {
	const lng = position.coords.longitude;
	const lat = position.coords.latitude;
	$("#latlon").val(lat + "," +lng);
	$("#latlon").trigger('input'); // Use for Chrome/Firefox/Edge
    $("#latlon").trigger('change'); // Use for Chrome/Firefox/Edge + IE11
}

// $(document).on("click", "#sbt", function (evt) {
// 	evt.preventDefault();
// });