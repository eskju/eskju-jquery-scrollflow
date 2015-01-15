/*
 * jQuery ScrollFlow plugin
 *
 * Copyright (c) 2015 Christian Witte
 * licensed under MIT license.
 *
 * https://github.com/eskju/eskju-jquery-scrollflow
 *
 * Version: 1.0.0
 * 
 * Licensed under MIT license.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

	$( document ).ready( function()
	{
		new ScrollFlow();
	});

	$.fn.ScrollFlow = function( options )
	{
		new ScrollFlow( options );
	}
	
	ScrollFlow = function( options )
	{
		this.init( options );
	}
	
	$.extend( ScrollFlow.prototype,
	{
		init : function( options )
		{
			this.options = $.extend(
			{
				useMobileTimeouts: true, // not supported yet
				mobileTimeout: 100, // not supported yet
				durationOnLoad: 0,
				durationOnResize: 250,
				durationOnScroll: 500
			}, options );
			
			this.lastScrollTop = 0;
			this.bindScroll();
			this.bindResize();
			this.update( this.options.durationOnLoad );
		},
		
		bindScroll : function()
		{
			var $this = this;
			
			$( window ).scroll( function()
			{
			 	$this.update();
			});

			$( window ).bind( "gesturechange", function()
			{
			 	$this.update();
			});
		},
		
		bindResize: function()
		{
			var $this = this;
			
			$( window ).resize( function()
			{
			 	$this.update( $this.options.durationOnResize );
			});
		},
		
		update: function( forcedDuration )
		{
			var $this = this;
			
			winHeight = $( window ).height();
			scrollTop = $( window ).scrollTop();
			
			$( ".scrollflow" ).each( function( key, obj )
			{
				objOffset = $( obj ).offset();
				objOffsetTop = parseInt( objOffset.top );
				
				// request object settings
				effectDuration = $this.options.durationOnScroll;
				effectDuration = typeof( forcedDuration ) != "undefined" ? forcedDuration : effectDuration;
				effectiveFromPercentage = ( !isNaN( parseInt( $( obj ).attr( "data-scrollflow-start" ) / 100 ) ) ? parseInt( $( obj ).attr( "data-scrollflow-start" ) ) / 100 : -0.25 );
				scrollDistancePercentage = ( !isNaN( parseInt( $( obj ).attr( "data-scrollflow-distance" ) / 100 ) ) ? parseInt( $( obj ).attr( "data-scrollflow-distance" ) ) / 100 : 0.5 );
				effectiveFrom = objOffsetTop - winHeight * ( 1 - effectiveFromPercentage );
				effectiveTo = objOffsetTop - winHeight * ( 1 - scrollDistancePercentage );
				// end object settings
				
				parallaxScale = 0.8;
				parallaxOpacity = 0;
				parallaxOffset = -100;
				factor = 0;
				
				if( scrollTop > effectiveFrom )
				{
					factor = ( scrollTop - effectiveFrom ) / ( effectiveTo - effectiveFrom );
					factor = ( factor > 1 ? 1 : factor );
				}
				
				options = {
					opacity: 1,
					scale: 1,
					translateX: 0,
					translateY: 0
				};
				
				if( $( obj ).hasClass( "-opacity" ) )
				{
					options.opacity = 0 + factor;
				}
				
				if( $( obj ).hasClass( "-pop" ) )
				{
					options.scale = 0.8 + factor * 0.2;
				}
				
				if( $( obj ).hasClass( "-slide-left" ) )
				{
					options.translateX = ( -100 + factor * 100 ) * -1;
				}
				
				if( $( obj ).hasClass( "-slide-right" ) )
				{
					options.translateX = ( -100 + factor * 100 );
				}
				
				if( $( obj ).hasClass( "-slide-top" ) )
				{
					options.translateY = ( -100 + factor * 100 ) * -1;
				}
				
				if( $( obj ).hasClass( "-slide-bottom" ) )
				{
					options.translateY = ( -100 + factor * 100 );
				}
				
				$( obj ).css({
					webkitFilter: "opacity(" + options.opacity + ")",
					mozFilter: "opacity(" + options.opacity + ")",
					oFilter: "opacity(" + options.opacity + ")",
					msFilter: "opacity(" + options.opacity + ")",
					filter: "opacity(" + options.opacity + ")",
					
					webkitTransform: "translate3d( " + parseInt( options.translateX ) + "px, " + parseInt( options.translateY ) + "px, 0px ) scale(" + options.scale + ")",
					mozTransform: "translate3d( " + parseInt( options.translateX ) + "px, " + parseInt( options.translateY ) + "px, 0px ) scale(" + options.scale + ")",
					oTransform: "translate3d( " + parseInt( options.translateX ) + "px, " + parseInt( options.translateY ) + "px, 0px ) scale(" + options.scale + ")",
					msTransform: "translate3d( " + parseInt( options.translateX ) + "px, " + parseInt( options.translateY ) + "px, 0px ) scale(" + options.scale + ")",
					transform: "translate3d( " + parseInt( options.translateX ) + "px, " + parseInt( options.translateY ) + "px, 0px ) scale(" + options.scale + ")",
					
					transition: "all " + effectDuration + "ms ease-out"
				});
			});
			
			return;
			
			// TODO: Timeout for mobile devices
			if( this.options.useMobileTimeouts && this.lastScrollTop != scrollTop )
			{
				this.lastScrollTop = scrollTop;
				
				$( "body" ).stop();
				$( "body" ).animate({ float: "none" }, this.options.mobileTimeout, function()
				{
					$this.update();
				});
			}
		}
	});
	