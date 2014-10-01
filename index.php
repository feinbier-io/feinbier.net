<!DOCTYPE html>
<html>
<head>
    <title>Web Portfolio of Michael Feinbier</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">

	<script src="bower_components/platform/platform.js"></script>

    <link rel="stylesheet" href="elements/styles.css">
    <link rel="import" href="elements/feinbier-page.html">
    <link rel="import" href="elements/feinbier-footer.html">
    <link rel="import" href="bower_components/core-media-query/core-media-query.html">

</head>
<body fullbleed>
    <feinbier-page>
        <div layout horizontal class="content-section dark intro">
	        <figure flex>
		        <?php #echo file_get_contents('images/lego3.svg'); ?>
	        </figure>
	        <div flex>
		        <h3>Herzlich Willkommen</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam corporis dolore dolorum enim eveniet facilis hic incidunt inventore,
		        ipsum, magni nam nostrum, quidem ratione rerum tempore vel voluptatum. Animi commodi debitis distinctio
		        exercitationem minima nam praesentium provident quasi quia, sed? Cumque deserunt explicabo harum pariatur quae quasi sed voluptatem.</p>
	        </div>
        </div>

	    <div class="content-section light">
		    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, libero!</p>
	    </div>

        <feinbier-footer></feinbier-footer>
    </feinbier-page>

    <core-media-query id="mediaQueryMobile" query="max-width: 640px"></core-media-query>

    <script>

        document.querySelector('#mediaQueryMobile').addEventListener('core-media-change',
            function(e) {
                console.info('core-media-change', e.detail);
                document.body.classList.toggle('core-narrow', e.detail.matches);
            });

    </script>

</body>
</html>