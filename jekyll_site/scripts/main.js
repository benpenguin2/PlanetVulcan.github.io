requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery.min',
		lightbox: '../../bower_components/lightbox2/dist/js/lightbox.min'
    }
});

requirejs(["jquery", "lightbox"], function(util) {
	console.log("Loaded.")
});