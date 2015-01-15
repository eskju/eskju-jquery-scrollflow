# esKju's jQuery ScrollFlow Plugin

## What is it?

Enhance your website by fancy effects based on the user's scroll index. Pop-in, pop-out, sliding, sticky notes and much more. The plugin supports mobile devices and eldered browsers.
It was built using the jQuery library. Licensed under MIT and GPL licenses.

## Features

+ Eased animations for incremental mouse scroll-wheels
+ Adds fancy effects to your homepage
+ Customizable trough settings and CSS
+ Highly compatible
+ Highly customizable
+ Uses CSS3 transitions by default

## How to use

### 1. doctype

Make sure you are using valid DOCTYPE. This is required for ScrollFlow to look and function correctly.

```
<!DOCTYPE html>
```

### 2. include files

Loading jQuery from CDN (Content Delivery Network) is recommended. 
Include all ScrollFlow JavaScript files in addition.

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/eskju.jquery.scrollflow.js"></script>
```

### 3. html markup

Add "scrollflow" and at least one of the following CSS classes to the desired object(s): slide-top, slide-left, slide-right, slide-bottom, -pop, -opacity

```
<h1 class="scrollflow -slide-top -opacity">Slide-Top with opacity fading</h1>
<p class="scrollflow -pop -opacity">Pop-Effect</p>
```

### 4. fire plugin

If you are not familiar with jQuery, please, read this tutorial for beginners.

```
$( document ).ready( function( )
{
	new ScrollFlow(); 
} );
```


## Options

Easy plugin, easy life. Configure things just to taste :)

```
$( document ).ready( function( )
{
	ScrollFlow( {
		your: "option",
		will: "be",
		the: "best"
	});
} );
```

| Option | Type | Default | Description |
|---------------------|---------|-------|---------------------------------------------------|
| durationOnLoad | int | 0 | Easing duration onLoad (important for page refresh) |
| durationOnResize | int | 250 | Easing duration on window resize |
| durationOnScroll | int | 500 | Easing duration on scroll |


## HTML Attributes

Customize single HTML objects

| Option | Type | Default | Description |
|---------------------|---------|-------|---------------------------------------------------|
| data-scrollflow-start | int | 25 | Define the scroll amount (in % of screen height) once the object is visible to start the animation |
| data-scrollflow-distance | int| 50 | Define the scroll amount (in % of screen height) once the object is visible to end the animation |


## Author & Help

For more information visit the author's page:

+ <http://www.cwdesigns.de> esKju's Playground
+ <http://www.cwdesigns.de/eskju-jquery-scrollflow.html> esKju's ScrollFlow Project Page
