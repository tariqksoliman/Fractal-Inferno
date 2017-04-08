var FractalInferno = function() {

    var varis = [
        {   //Linear
            f: function( x, y ) {
                return [ x, y ];
            }
        },
        {   //Sinusoidal
            f: function( x, y ) {
                return [ Math.sin(x), Math.sin(y) ];
            }
        },
        {   //Spherical
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ x / Math.pow( r, 2 ), y / Math.pow( r, 2 ) ];
            }
        },
        {   //Swirl
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ ( x * Math.sin( Math.pow( r, 2 ) ) ) - ( y * Math.cos( Math.pow( r, 2 ) ) ),
                        ( x * Math.cos( Math.pow( r, 2 ) ) ) + ( y * Math.sin( Math.pow( r, 2 ) ) )];
            }
        },
        {   //Horseshoe
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ ( 1 / r ) * ( x - y ) * ( x + y ),  
                        ( 1 / r ) * 2 * x * y ];
            }
        },
        {   //Polar
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ th / Math.PI, r - 1 ];
            }
        },
        {   //Hankerchief
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ r * Math.sin( th + r ), r * Math.cos( th - r ) ];
            }
        },
        {   //Heart
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ r * Math.sin( th * r ), r * -Math.cos( th * r ) ];
            }
        },
        {   //Disc
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ ( th / Math.PI ) * Math.sin( Math.PI * r ),  ( th / Math.PI ) * Math.cos( Math.PI * r ) ];
            }
        },
        {   //Spiral
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ ( 1 / r ) * ( Math.cos(th) + Math.sin(r) ), ( 1 / r ) * ( Math.sin(th) - Math.cos(r) ) ];
            }
        },
        {   //Hyperbolic
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ Math.sin(th) / r, r * Math.cos(th) ];
            }
        },
        {   //Diamond
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                return [ Math.sin(th) * Math.cos(r), Math.cos(th) * Math.sin(r) ];
            }
        },
        {   //Ex
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                var p0 = Math.sin( th + r );
                var p1 = Math.cos( th - r );
                return [ r * ( Math.pow( p0, 3 ) + Math.pow( p1, 3 ) ), r * ( Math.pow( p0, 3 ) - Math.pow( p1, 3 ) ) ];
            }
        },
        {   //Julia
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                var th = Math.atan2( x, y );
                var om = 0;
                return [ Math.sqrt(r) * Math.cos( th / 2 + om ), Math.sqrt(r) * Math.sin( th / 2 + om ) ];
            }
        },
        {   //Bent
            f: function( x, y ) {
                if( x >= 0 && y >= 0 )
                    return [ x, y ];
                else if( x < 0 && y >= 0 )
                    return [ 2 * x, y ];
                else if( x >= 0 && y < 0 )
                    return [ x, y * 0.5 ];
                else
                    return [ 2 * x, y * 0.5 ];
            }
        },
        /*
        {   //Waves
            f: function( x, y ) {

            }
        },
        */
        {   //Fisheye
            f: function( x, y ) {
                var r = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
                return [ ( 2 * y ) / ( r + 1 ), ( 2 * x ) / ( r + 1 ) ];
            }
        }
    ];

    var funcs = [];

    function runFunc( fi, x, y ) {
        var s;
        var xnew = 0;
        var ynew = 0;
        for( var i = 0; i < funcs[fi].v.length; i++ ) {
            s = varis[funcs[fi].v[i]].f( funcs[fi].c[0]*x + funcs[fi].c[1]*y + funcs[fi].c[2],
                                        funcs[fi].c[3]*x + funcs[fi].c[4]*y + funcs[fi].c[5] );
            xnew += ( s[0] * funcs[fi].w[i] );
            ynew += ( s[1] * funcs[fi].w[i] );
        }
        return [ xnew, ynew ];
    }

    function randomizeFuncs() {
        var numOfFuncs = Math.max( Math.floor( Math.random() * 20 ), 4 );

        for( var i = 0; i < numOfFuncs; i++ ) {
            var v = []; //array of ascending varis indicies
            var w = []; //array of non-negative nums summing to 1 with same length as v
            var col = []; //rgb triplet each 0 to 1
            var c = []; //array of 6 coefficients

            //v
            //Pick random varis indicies and add them to v if they aren't already there
            var maxNumOfVarisPerFunc = Math.round( Math.random() * 5 ) + 1;
            for( var j = 0; j < maxNumOfVarisPerFunc; j++ ) {
                var randomVarisI = Math.floor( Math.random() * varis.length ); 
                if( v.indexOf( randomVarisI ) == -1 ) {
                    v.push( randomVarisI );
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
            var cofMult = 4;
            var cofSub = 2;
            for( var j = 0; j < 6; j++ ) {
                var cof = Math.random() * cofMult - cofSub;
                c.push( cof );
            }

            //Add the new func parameters
            funcs.push( { v:v, w:w, col:col, c:c } );
        }
    }

    randomizeFuncs();

    var canvas = document.getElementById( 'canvas' );
    var canvasWidth = canvas.width = window.innerWidth;
    var canvasHeight = canvas.height = window.innerHeight;
    canvasWidth = canvas.width = canvasHeight;
    var ctx = canvas.getContext( '2d' );
    ctx.imageSmoothingEnabled = false;
    var imgData = ctx.createImageData( canvasWidth, canvasHeight );

    
    var histoScale = 3;
    var freqHistogram = new Uint32Array( Math.pow( canvasWidth, 2 ) * Math.pow( histoScale, 2 ) );
    var colHistogram = new Uint8Array( Math.pow( canvasWidth, 2 ) * Math.pow( histoScale, 2 ) * 3 );
    //fill Histograms with 0s
    for( var i = 0; i < freqHistogram.length; i++ ) {
        freqHistogram[i] = 0;
    }
    for( var i = 0; i < colHistogram.length; i++ ) {
        colHistogram[i] = 0;
    }

    var steps = 10000000;
    var stepCount = 0;
    var frameStep = 25000;
    
    //Random function weight
    var weights = [];
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

    //Choose a random final function
    var final = Math.floor( Math.random() * funcs.length );
    var cfinal = Math.floor( Math.random() * funcs.length );
    //rotations
    var rot = Math.floor( Math.random() * 3 );

    var renderBar = document.getElementById( 'renderingbar' );

    var firstPass = true;
    function iterate() {
        for( var i = 0; i < frameStep; i++ ) {
            w = weightedRand( weights );

            //random
            p = runFunc( w, p[0], p[1] );
            //final
            p = runFunc( final, p[0], p[1] );
            //Stretch to fit canvas
            ph = [ Math.round( ( p[0] + 2 ) * ( canvasWidth * histoScale / 4 ) ), Math.round( ( p[1] + 2 ) * ( canvasHeight * histoScale / 4 ) ) ];

            //
            pn = [ Math.round( ( p[0] + 2 ) * ( canvasWidth / 4 ) ), Math.round( ( p[1] + 2 ) * ( canvasHeight / 4 ) ) ];
            //Rotate for symmetry
            //Ugly - clean this up
            
            if( rot == 1 ) {
                if( i%2 == 0 ) {
                    ph = rotatePoint( ph, Math.PI, canvasWidth * histoScale / 2, canvasHeight * histoScale / 2 );
                    pn = rotatePoint( pn, Math.PI, canvasWidth / 2, canvasHeight / 2 );
                }
            }
            else if( rot == 2 ) {
                if( i%3 == 0 ) {
                    ph = rotatePoint( ph, 2 * Math.PI / 3, canvasWidth * histoScale / 2, canvasHeight * histoScale / 2 );
                    pn = rotatePoint( pn, 2 * Math.PI / 3, canvasWidth / 2, canvasHeight / 2 );
                }
                else if( i%2 == 0 ) {
                    ph = rotatePoint( ph, 4 * Math.PI / 3, canvasWidth * histoScale / 2, canvasHeight * histoScale / 2 );
                    pn = rotatePoint( pn, 4 * Math.PI / 3, canvasWidth / 2, canvasHeight / 2 );
                }
            }
            

            //Update colors
            c[0] = ( ( c[0] + funcs[w].col[0] ) / 2 );
            c[1] = ( ( c[1] + funcs[w].col[1] ) / 2 );
            c[2] = ( ( c[2] + funcs[w].col[2] ) / 2 );
            //Colors final pass
            /*
            c[0] = ( ( c[0] + funcs[cfinal].col[0] ) / 2 );
            c[1] = ( ( c[1] + funcs[cfinal].col[1] ) / 2 );
            c[2] = ( ( c[2] + funcs[cfinal].col[2] ) / 2 );       
            */

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
        renderBar.innerText = 'Iterating ' + Math.floor( stepCount / steps * 100 ) + '%';
        if( stepCount <= steps ) {
            ctx.putImageData( imgData, 0, 0 );
            window.requestAnimationFrame( iterate );
        }
        else {
            render();
        }
    }
    iterate();

    function render() {

        var maxFreq = findMaxFreq() / 10;
        var avgFreq;
        var avgCol;
        var alpha;
        var gamma = 2.2;

        for( var x = 0; x < canvasWidth; x++ ) {
            for( var y = 0; y < canvasWidth; y++ ) {
                avgFreq = averageFreqForCell( x, y );
                avgCol = averageColorForCell( x, y );
                avgCol = makeVibrant( avgCol );
                
                alpha = Math.log10( avgFreq ) / Math.log10( maxFreq );
                imgData.data[ (y * canvasWidth * 4) + (x * 4) + 0 ] = avgCol[0] * Math.pow( alpha, 1/gamma );
                imgData.data[ (y * canvasWidth * 4) + (x * 4) + 1 ] = avgCol[1] * Math.pow( alpha, 1/gamma );
                imgData.data[ (y * canvasWidth * 4) + (x * 4) + 2 ] = avgCol[2] * Math.pow( alpha, 1/gamma );
                imgData.data[ (y * canvasWidth * 4) + (x * 4) + 3 ] = alpha * 255;
            }
            renderBar.innerText = 'Rendering ' + Math.round( x / canvasWidth * 100 ) + '%';
        }

        ctx.putImageData( imgData, 0, 0 );
        
        renderBar.innerText = 'Done! Refresh page to generate another.';
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
        //return [ xnew, ynew ];
    }

    //Vibrancy
    //Converts RGB to HSL, Maximizes S and L, then converts back to rgb
    function makeVibrant( rgbArr ) {
        var hsl = rgb2hsl( rgbArr );
        //console.log( hsl );
        hsl[1] = ( hsl[1] + 200 ) / 3;
        hsl[2] = ( hsl[2] + 100 ) / 2;
        return hsl2rgb( hsl[0]/360, hsl[1]/100, hsl[2]/100 );
    }
    function rgb2hsl(rgbArr){
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

};