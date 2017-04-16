var FractalInferno = function() {

    var fractalinferno = {
        varisNames: [ 'Linear', 'Sinusoidal', 'Spherical', 'Swirl', 'Horseshoe', 'Polar',
                     'Hankerchief', 'Heart', 'Disc', 'Spiral', 'Hyperbolic', 'Diamond', 'Ex',
                     'Julia', 'JuliaN', 'Bent', 'Waves', 'Fisheye', 'Popcorn', 'Power', 'Rings', 'Fan',
                     'Eyefish', 'Bubble', 'Cylinder', 'Tangent', 'Cross', 'Noise', 'Blur', 'Square' ],
        setFuncs: setFuncs,
        getFuncs: getFuncs,
        setParams: setParams,
        begin: begin,
        start: start,
        stop: stop,
        render: render
    };

    //current function i
    //for dependent varis funcs
    var cfi = 0;
    
    var varis = [
        {   
            name: 'Linear',
            f: function( x, y ) {
                return [ x, y ];
            }
        },
        {   
            name: 'Sinusoidal',
            f: function( x, y ) {
                return [ Math.sin(x), Math.sin(y) ];
            }
        },
        {   
            name: 'Spherical',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ x / Math.pow( r, 2 ), y / Math.pow( r, 2 ) ];
            }
        },
        {   
            name: 'Swirl',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ ( x * Math.sin( Math.pow( r, 2 ) ) ) - ( y * Math.cos( Math.pow( r, 2 ) ) ),
                        ( x * Math.cos( Math.pow( r, 2 ) ) ) + ( y * Math.sin( Math.pow( r, 2 ) ) )];
            }
        },
        {   
            name: 'Horseshoe',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ ( 1 / r ) * ( x - y ) * ( x + y ),  
                        ( 1 / r ) * 2 * x * y ];
            }
        },
        {   
            name: 'Polar',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ th / Math.PI, r - 1 ];
            }
        },
        {   
            name: 'Hankerchief',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ r * Math.sin( th + r ), r * Math.cos( th - r ) ];
            }
        },
        {   
            name: 'Heart',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ r * Math.sin( th * r ), r * -Math.cos( th * r ) ];
            }
        },
        {   
            name: 'Disc',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ ( th / Math.PI ) * Math.sin( Math.PI * r ),  ( th / Math.PI ) * Math.cos( Math.PI * r ) ];
            }
        },
        {   
            name: 'Spiral',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ ( 1 / r ) * ( Math.cos(th) + Math.sin(r) ), ( 1 / r ) * ( Math.sin(th) - Math.cos(r) ) ];
            }
        },
        {   
            name: 'Hyperbolic',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ Math.sin(th) / r, r * Math.cos(th) ];
            }
        },
        {   
            name: 'Diamond',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                return [ Math.sin(th) * Math.cos(r), Math.cos(th) * Math.sin(r) ];
            }
        },
        {   
            name: 'Ex',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                var p0 = Math.sin( th + r );
                var p1 = Math.cos( th - r );
                return [ r * ( Math.pow( p0, 3 ) + Math.pow( p1, 3 ) ), r * ( Math.pow( p0, 3 ) - Math.pow( p1, 3 ) ) ];
            }
        },
        {   
            name: 'Julia',
            f: function( x, y ) {
                var rs = Math.sqrt( Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) ) );
                var th = Math.atan2( y, x );
                var om = funcs[cfi].r || ( funcs[cfi].c[0] + funcs[cfi].c[1] + funcs[cfi].c[2] + funcs[cfi].c[3] + funcs[cfi].c[4] + funcs[cfi].c[5] );
                return [ rs * Math.cos( th / 2 + om ), rs * Math.sin( th / 2 + om ) ];
            }
        },
        {   
            name: 'JuliaN',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var ph = Math.atan2( x, y );
                var p1 = 1;
                var p2 = 0.75;
                var rnd = funcs[cfi].r || 0.5;
                var p3 = Math.trunc( Math.abs( p1 ) * rnd );
                var t = ( ph + ( 2 * Math.PI * p3 ) ) / p1;
                var rpp = Math.pow( r, p2/p1 );
                return [ rpp * Math.cos( t ), rpp * Math.sin( t ) ];
            }
        },
        {   
            name: 'Bent',
            f: function( x, y ) {
                if( x >= 0 && y >= 0 )
                    return [ x, y ];
                else if( x < 0 && y >= 0 )
                    return [ 2 * x, y ];
                else if( x >= 0 && y < 0 )
                    return [ x, y / 2 ];
                else
                    return [ 2 * x, y /2 ];
            }
        },
        {
            name: 'Waves',
            f: function( x, y ) {
                return [ x + ( funcs[cfi].c[1] * Math.sin( y / Math.pow( funcs[cfi].c[2], 2 ) ) ),
                         y + ( funcs[cfi].c[4] * Math.sin( x / Math.pow( funcs[cfi].c[5], 2 ) ) ) ];
            }
        },
        {   
            name: 'Fisheye',
            f: function( x, y ) {
                var re = 2 / ( Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) ) + 1 );
                return [ re * y, re * x ];
            }
        },
        {   
            name: 'Popcorn',
            f: function( x, y ) {
                return [ x + ( funcs[cfi].c[2] * Math.sin( Math.tan( 3 * y ) ) ),
                         y + ( funcs[cfi].c[5] * Math.sin( Math.tan( 3 * x ) ) ) ];
            }
        },
        {   
            name: 'Power',
            f: function( x, y ) {
                var th = Math.atan2( y, x );
                var rsth = Math.pow( Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) ), Math.sin(th) );
                return [ rsth * Math.cos(th), rsth * Math.sin(th) ];
            }
        },
        {   
            name: 'Rings',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                var re = modn( ( r + Math.pow( funcs[cfi].c[2], 2 ) ), ( 2 * Math.pow( funcs[cfi].c[2], 2 ) ) ) - Math.pow( funcs[cfi].c[2], 2 ) + ( r * ( 1 - Math.pow( funcs[cfi].c[2], 2 ) ) );
                return [ re * Math.cos(th), re * Math.sin(th) ];
            }
        },
        {   
            name: 'Fan',
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( y, x );
                var t = Math.PI * Math.pow( funcs[cfi].c[2], 2 );
                if( modn( ( th + funcs[cfi].c[5] ), t ) > ( t / 2 ) ) {
                    return [ r * Math.cos( th - ( t / 2 ) ), r * Math.sin( th - ( t / 2 ) ) ];
                }
                else {
                    return [ r * Math.cos( th + ( t / 2 ) ), r * Math.sin( th + ( t / 2 ) ) ];
                }
            }
        },
        {   
            name: 'Eyefish',
            f: function( x, y ) {
                var re = 2 / ( Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) ) + 1 );
                return [ re * x, re * y ];
            }
        },
        {   
            name: 'Bubble',
            f: function( x, y ) {
                var re = 4 / ( Math.pow( Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) ), 2 ) + 4 );
                return [ re * x, re * y ];
            }
        },
        {   
            name: 'Cylinder',
            f: function( x, y ) {
                return [ Math.sin(x), y ];
            }
        },
        {   
            name: 'Tangent',
            f: function( x, y ) {
                return [ Math.sin(x) / Math.cos(y), Math.tan(y) ];
            }
        },
        {   
            name: 'Cross',
            f: function( x, y ) {
                var s = Math.sqrt( 1 / Math.pow( Math.pow( x, 2 ) - Math.pow( y, 2 ), 2 ) );
                return [ s * x, s * y ];
            }
        },
        {   
            name: 'Noise',
            f: function( x, y ) {
                var p1 = Math.random();
                var p2 = Math.random();
                return [ p1 * x * Math.cos( 2 * Math.PI * p2 ), p1 * y * Math.sin( 2 * Math.PI * p2 ) ];
            }
        },
        {   
            name: 'Blur',
            f: function( x, y ) {
                var p1 = Math.random();
                var p2 = Math.random();
                return [ p1 * Math.cos( 2 * Math.PI * p2 ), p1 * Math.sin( 2 * Math.PI * p2 ) ];
            }
        },
        {
            name: 'Square',
            f: function( x, y ) {
                var p1 = Math.random();
                var p2 = Math.random();
                return [ p1 - 0.5, p2 - 0.5 ];
            }
        }
    ];

    var funcs;
    var weights;

    function runFunc( fi, x, y ) {
        var s;
        var xnew = 0;
        var ynew = 0;

        cfi = fi;
        
        for( var i = 0; i < funcs[fi].v.length; i++ ) {
            s = varis[funcs[fi].v[i]].f( funcs[fi].c[0]*x + funcs[fi].c[1]*y + funcs[fi].c[2],
                                        funcs[fi].c[3]*x + funcs[fi].c[4]*y + funcs[fi].c[5] );
            xnew += ( s[0] * funcs[fi].w[i] );
            ynew += ( s[1] * funcs[fi].w[i] );
        }
        return [ xnew, ynew ];
    }

    function setFuncs( funcsJSON ) {
        funcs = [];
        weights = [];
        if( funcsJSON && funcsJSON[0] && funcsJSON[0] == 'custom' ) {
            funcsJSON.shift(); //remove first element
            for( var i = 0; i < funcsJSON.length; i++ ) {
                for( var j = 0; j < funcsJSON[i].v.length; j++ ) {
                    for( var k = 0; k < varis.length; k++ ) {
                        if( varis[k].name == funcsJSON[i].v[j] ) {
                            funcsJSON[i].v[j] = k;
                        }
                    } 
                }
                weights.push( funcsJSON[i].weight );
            }
            funcs = funcsJSON;
        }
        else { //Randomize
            funcsJSON.shift(); //remove first element

            //2 to 20
            var numOfFuncs = Math.max( Math.floor( Math.random() * 21 ), 2 );

            for( var i = 0; i < numOfFuncs; i++ ) {
                var v = []; //array of ascending varis indicies
                var w = []; //array of non-negative nums summing to 1 with same length as v
                var col = []; //rgb triplet each 0 to 1
                var c = []; //array of 6 coefficients
                var r; //Some random 0 to 1 var for possible use in variations
                //v
                //Pick random varis indicies and add them to v if they aren't already there
                var maxNumOfVarisPerFunc = Math.round( Math.random() * 4 ) + 3;
                for( var j = 0; j < maxNumOfVarisPerFunc; j++ ) {
                    var varisName = funcsJSON[ Math.floor( Math.random() * funcsJSON.length ) ]; 
                    for( var k = 0; k < varis.length; k++ ) {
                        if( varis[k].name == varisName ) {
                            if( v.indexOf( k ) == -1 ) {
                                v.push( k );
                            }
                        }
                    }    
                }

                //w
                //Set all the weights to 0
                var totalSum = 0;
                var weightInc = 0.05;
                for( var j = 0; j < v.length; j++ ) {
                    w.push( 0 );
                }
                //Keep randomly incrementing weights until their sum is 1
                while( totalSum < 1 ) {
                    w[ Math.floor( Math.random() * v.length ) ] += weightInc;
                    totalSum += weightInc;
                }

                //col
                col = [ Math.random(), Math.random(), Math.random() ];

                //c
                var cofMult = 3;
                var cofSub = 1.5;
                for( var j = 0; j < 6; j++ ) {
                    var cof = Math.random() * cofMult - cofSub;
                    c.push( cof );
                }

                //r
                r = Math.random();

                //Add the new func parameters
                funcs.push( { v:v, w:w, col:col, c:c, r:r } );
            }

            //Random weights for each function
            var totalSum = 0;
            var weightInc = 0.5;
            for( var i = 0; i < funcs.length; i++ ) {
                weights.push( 0 );
            }
            //Keep randomly incrementing weights until their sum is 1
            while( totalSum < 0.99 ) {
                weights[ Math.floor( Math.random() * funcs.length ) ] += weightInc;
                totalSum += weightInc;
                weightInc /= 2;
            }
            //match weights with funcs
            for( var i = 0; i < funcs.length; i++ ) {
                funcs[i].weight = weights[i];
            }
        }
    }

    function getFuncs() {
        return funcs;
    }

    var final;
    var cfinal;
    var canvasWidth;
    var canvasHeight;
    var zoom;
    var rot;

    var canvas;
    var ctx;
    var imgdata;

    var freqHistogram;
    var colHistogram;

    var mirrorX;
    var mirrorY;

    //Supersampling factor
    var histoScale = 3;

    //Sets final func, final color and rotation
    function setParams( params ) {
        //-1 for none
        //1 for no rot
        final = params.final || Math.floor( Math.random() * ( funcs.length + 1 ) ) - 1;
        cfinal = params.cfinal || Math.floor( Math.random() * ( funcs.length + 1 ) ) - 1;

        canvas = document.getElementById( 'canvas' );
        canvasWidth = canvas.width = params.canvasW || window.innerWidth;
        canvasHeight = canvas.height = params.canvasH || window.innerHeight;
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = canvasHeight + 'px';

        //and center it in page
        var left = ( window.innerWidth / 2 ) - ( canvasWidth / 2 );
        var top = ( window.innerHeight / 2 ) - ( canvasHeight / 2 );
        if( left < 0 ) left = 0;
        if( top < 0 ) top = 0;
        canvas.style.left = left + 'px';
        canvas.style.top = top + 'px';
        window.scrollTo( (left == 0) ? ( canvasWidth / 2 ) - ( window.innerWidth / 2 ) : 0, (top == 0) ? ( canvasHeight / 2 ) - ( window.innerHeight / 2 ) : 0 );

        ctx = canvas.getContext( '2d' );
        ctx.imageSmoothingEnabled = false;
        freqHistogram = new Uint32Array( canvasWidth * canvasHeight * Math.pow( histoScale, 2 ) );
        colHistogram = new Uint8Array( canvasWidth * canvasHeight * Math.pow( histoScale, 2 ) * 3 );

        zoom = params.zoom || 1;

        rot = params.rot || Math.floor( Math.random() * 20 ) + 1;

        mirrorX = params.mirrorX || false;
        mirrorY = params.mirrorY || false;
    }

    var animFrameId;

    var stepCount = 0;
    var frameStep = 5000;
    
    var renderBar = document.getElementById( 'renderingbar' );

    var cycle;

    function begin() {

        cycle = true;
        stepCount = 0;
        if( animFrameId ) window.cancelAnimationFrame( animFrameId );

        //Clear canvas and histograms
        ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
        imgData = ctx.createImageData( canvasWidth, canvasHeight );
        //fill Histograms with 0s
        for( var i = 0; i < freqHistogram.length; i++ ) {
            freqHistogram[i] = 0;
        }
        for( var i = 0; i < colHistogram.length; i++ ) {
            colHistogram[i] = 0;
        }

        //Choose random point
        var p = [ 2 * Math.random() - 1, 2 * Math.random() - 1 ];
        var pS;
        //For mapping unto canvas
        var ph = [ 0, 0 ];
        var pn = [ 0, 0 ];

        var w = 0;
        //Choose a random color
        var c = [ Math.random(), Math.random(), Math.random() ];
        var colorsave; //just a temp var

        var currentRot = 0;

        var firstPass = true;
        function iterate() {
            if( cycle ) {
                for( var i = 0; i < frameStep; i++ ) {
                    w = weightedRand( weights );

                    //random
                    p = runFunc( w, p[0], p[1] );
                    //final
                    if( final != -1 ) {
                        p = runFunc( final, p[0], p[1] );
                    }

                    //saved point so we can change it without altering original
                    pS = [ p[0], p[1] ];

                    //zooming
                    pS[0] *= zoom;
                    pS[1] *= zoom;

                    //mirroring
                    if( mirrorX && !mirrorY ) {
                        if( i % 2 == 0 ){
                            pS[1] *= -1;
                        }
                    }
                    else if( mirrorY && !mirrorX ) {
                        if( i % 2 == 0 ) {
                            pS[0] *= -1;
                        }
                    }
                    else if( mirrorX && mirrorY ) {
                        if( i % 4 == 0 ) {
                            pS[0] *= -1;
                        }
                        else if( i % 3 == 0 ) {
                            pS[0] *= -1;
                            pS[1] *= -1;
                        }
                        else if( i % 2 == 0 ) {
                            pS[1] *= -1;
                        }
                    }
                    
                    //Stretch to fit canvas and histograms
                    ph = [ Math.round( ( pS[0] + 2 * (canvasWidth/canvasHeight) ) * ( canvasHeight * histoScale / 4 ) ), Math.round( ( pS[1] + 2 ) * ( canvasHeight * histoScale / 4 ) ) ];
                    pn = [ Math.round( ( pS[0] + 2 * (canvasWidth/canvasHeight) ) * ( canvasHeight / 4 ) ), Math.round( ( pS[1] + 2 ) * ( canvasHeight / 4 ) ) ];

                    //Rotate
                    if( rot > 1 ) {
                        ph = rotatePoint( ph, currentRot, canvasWidth * histoScale / 2, canvasHeight * histoScale / 2 );
                        pn = rotatePoint( pn, currentRot, canvasWidth / 2, canvasHeight / 2 );
                        currentRot = ( currentRot + ( 2 * Math.PI / rot ) ) % ( 2 * Math.PI );
                    }
                    
                    //Update colors
                    c[0] = ( ( c[0] + funcs[w].col[0] ) / 2 );
                    c[1] = ( ( c[1] + funcs[w].col[1] ) / 2 );
                    c[2] = ( ( c[2] + funcs[w].col[2] ) / 2 );
                    //Colors final pass
                    if( cfinal != -1 ) {
                        c[0] = ( ( c[0] + funcs[cfinal].col[0] ) / 2 );
                        c[1] = ( ( c[1] + funcs[cfinal].col[1] ) / 2 );
                        c[2] = ( ( c[2] + funcs[cfinal].col[2] ) / 2 );
                    }

                    //Update Histograms
                    if( !firstPass || ( firstPass && i > 20 ) ) {
                        //Frequency
                        freqHistogram[ (ph[1] * canvasWidth * histoScale) + ( ph[0] ) ] += 10;
                        //Color
                        colorsave = Math.floor( ( colHistogram[ (ph[1] * canvasWidth * 3 * histoScale) + ( ph[0] * 3 ) + 0 ] + ( c[0] * 255 ) ) / 2 )
                        colHistogram[ (ph[1] * canvasWidth * 3 * histoScale) + ( ph[0] * 3 ) + 0 ] = colorsave;
                        colorsave = Math.floor( ( colHistogram[ (ph[1] * canvasWidth * 3 * histoScale) + ( ph[0] * 3 ) + 1 ] + ( c[1] * 255 ) ) / 2 )
                        colHistogram[ (ph[1] * canvasWidth * 3 * histoScale) + ( ph[0] * 3 ) + 1 ] = colorsave;
                        colorsave = Math.floor( ( colHistogram[ (ph[1] * canvasWidth * 3 * histoScale) + ( ph[0] * 3 ) + 2 ] + ( c[2] * 255 ) ) / 2 )
                        colHistogram[ (ph[1] * canvasWidth * 3 * histoScale) + ( ph[0] * 3 ) + 2 ] = colorsave;
                    }

                    //Update pixels
                    if( !firstPass || ( firstPass && i > 20 ) ) {
                        imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 0 ] = c[0] * 255 + ( imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 3 ] / 12 );
                        imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 1 ] = c[1] * 255 + ( imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 3 ] / 12 );
                        imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 2 ] = c[2] * 255 + ( imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 3 ] / 12 );
                        imgData.data[ (pn[1] * canvasWidth * 4) + ( pn[0] * 4 ) + 3 ] += 4;
                    }
                }
                firstPass = false;
                stepCount += frameStep;
                renderBar.innerText = 'Points: ' + stepCount.toExponential( 4 );
                ctx.putImageData( imgData, 0, 0 );     
            }
            animFrameId = window.requestAnimationFrame( iterate );
        }
        iterate();
    }

    function stop() {
        cycle = false;
    }
    function start() {
        cycle = true;
    }

    function render( params ) {
        if( !imgData ) return;

        var freqThreshold = params.freqThreshold || 10;
        var gamma = params.gamma || 2.2;
        var hueShift = params.hueShift || 0;
        var satShift = params.satShift || 0;
        var lightShift = params.lightShift || 0;

        var maxFreq = findMaxFreq() / freqThreshold;
        var avgFreq;
        var avgCol;
        var alpha;

        var x = 0;

        renderLine();
        function renderLine( ) {
            for( var c = 0; c < 100 && x < canvasWidth; c++ ) {
                for( var y = 0; y < canvasWidth; y++ ) {
                    avgFreq = averageFreqForCell( x, y );
                    avgCol = averageColorForCell( x, y );
                    avgCol = makeVibrant( avgCol, hueShift, satShift, lightShift );
                    
                    alpha = Math.log10( avgFreq ) / Math.log10( maxFreq );
                    imgData.data[ (y * canvasWidth * 4) + (x * 4) + 0 ] = avgCol[0] * Math.pow( alpha, 1/gamma );
                    imgData.data[ (y * canvasWidth * 4) + (x * 4) + 1 ] = avgCol[1] * Math.pow( alpha, 1/gamma );
                    imgData.data[ (y * canvasWidth * 4) + (x * 4) + 2 ] = avgCol[2] * Math.pow( alpha, 1/gamma );
                    imgData.data[ (y * canvasWidth * 4) + (x * 4) + 3 ] = alpha * 255;
                }       
                x++;
            }
            //x increments at end so we don't need x + 1 to fill out percentage
            renderBar.innerText = 'Rendering ' + Math.floor( x / canvasWidth * 100 ) + '%';
            if( x < canvasWidth ) {
                setTimeout( renderLine, 1 );
            }
            else {         
                ctx.putImageData( imgData, 0, 0 );
                renderBar.innerText = 'Rendered with ' + stepCount.toExponential( 4 ) + ' points';
            }
        }
    }

    function findMaxFreq() {
        var maxFreq = 0;
        for( var x = 0; x < canvasWidth; x++ ) {
            for( var y = 0; y < canvasWidth; y++ ) {
                maxFreq = Math.max( maxFreq, averageFreqForCell( x, y ) );
            }
        }
        return maxFreq;
    }
    function averageFreqForCell( x, y ) {
        var sum = 0;
        for( var hx = x * histoScale; hx < x * histoScale + histoScale; hx++ ) {
            for( var hy = y * histoScale; hy < y * histoScale + histoScale; hy++ ) {
                sum += freqHistogram[ (hy * canvasWidth * histoScale) + (hx) ] || 0;
            }
        }
        return sum / Math.pow( histoScale, 2 );
    }
    function averageColorForCell( x, y ) {
        var sum = [ 0, 0, 0 ]; // r g b
        for( var hx = x * (histoScale * 3); hx < x * (histoScale * 3) + (histoScale * 3); hx += 3 ) {
            for( var hy = y * histoScale; hy < y * histoScale + histoScale; hy++ ) {
                sum[0] += colHistogram[ (hy * canvasWidth * histoScale * 3) + (hx) + 0] || 0;
                sum[1] += colHistogram[ (hy * canvasWidth * histoScale * 3) + (hx) + 1] || 0;
                sum[2] += colHistogram[ (hy * canvasWidth * histoScale * 3) + (hx) + 2] || 0;
            }
        }
        return [ sum[0] / Math.pow( histoScale, 2 ), sum[1] / Math.pow( histoScale, 2 ), sum[2] / Math.pow( histoScale, 2 ) ];
    }


    function weightedRand( weights ) {
        var rand = Math.random();
        var w = 0;
        for( var i = 0; i < weights.length; i++ ) {
            w += weights[i];
            if( rand <= w ) return i;
        }
        return 0;
    }

    function rotatePoint( p, angle, cx, cy ) {
        p[0] -= cx;
        p[1] -= cy;

        var xnew = p[0] * Math.cos( angle ) - p[1] * Math.sin( angle );
        var ynew = p[0] * Math.sin( angle ) + p[1] * Math.cos( angle );

        return [ Math.round( xnew + cx ), Math.round( ynew + cy ) ];
    }
    function modn( n, m ) {
        return ( (n % m) + m ) % m;
    }

    //Vibrancy / HSL shifts
    //Converts RGB to HSL, Maximizes S and L, then converts back to rgb
    function makeVibrant( rgbArr, hueShift, satShift, lightShift ) {
        var hsl = rgb2hsl( rgbArr );
        hsl[0] = ( hsl[0] + hueShift ) % 360;
        hsl[1] = ( hsl[1] + ( Math.max( satShift, 0 ) * 100 ) ) / ( Math.abs( satShift ) + 1 );
        hsl[2] = ( hsl[2] + ( Math.max( lightShift, 0 ) * 100 ) ) / ( Math.abs( lightShift ) + 1);
        return hsl2rgb( hsl[0]/360, hsl[1]/100, hsl[2]/100 );
    }
    function rgb2hsl( rgbArr ) {
        var r1 = rgbArr[0] / 255;
        var g1 = rgbArr[1] / 255;
        var b1 = rgbArr[2] / 255;
    
        var maxColor = Math.max(r1,g1,b1);
        var minColor = Math.min(r1,g1,b1);
        //Calculate L:
        var L = (maxColor + minColor) / 2 ;
        var S = 0;
        var H = 0;
        if(maxColor != minColor){
            //Calculate S:
            if(L < 0.5){
                S = (maxColor - minColor) / (maxColor + minColor);
            }else{
                S = (maxColor - minColor) / (2.0 - maxColor - minColor);
            }
            //Calculate H:
            if(r1 == maxColor){
                H = (g1-b1) / (maxColor - minColor);
            }else if(g1 == maxColor){
                H = 2.0 + (b1 - r1) / (maxColor - minColor);
            }else{
                H = 4.0 + (r1 - g1) / (maxColor - minColor);
            }
        }
    
        L = L * 100;
        S = S * 100;
        H = H * 60;
        if(H<0){
            H += 360;
        }
        var result = [H, S, L];
        return result;
    }
    function hsl2rgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    return fractalinferno;

};