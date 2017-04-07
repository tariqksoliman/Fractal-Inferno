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
        var numOfFuncs = Math.max( Math.floor( Math.random() * 8 ), 3 );

        for( var i = 0; i < numOfFuncs; i++ ) {
            var v = []; //array of ascending varis indicies
            var w = []; //array of non-negative nums summing to 1 with same length as v
            var col = []; //rgb triplet each 0 to 1
            var c = []; //array of 6 coefficients

            //v
            //Pick random varis indicies and add them to v if they aren't already there
            var maxNumOfVarisPerFunc = Math.max( Math.floor( Math.random() * varis.length ), 2 );
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
            c = [
                Math.random() * cofMult - cofSub,
                Math.random() * cofMult - cofSub,
                Math.random() * cofMult - cofSub,
                Math.random() * cofMult - cofSub,
                Math.random() * cofMult - cofSub,
                Math.random() * cofMult - cofSub
            ];

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
    var pn = [ 0, 0 ];

    var w = 0;
    //Choose a random color
    var c = [ Math.random(), Math.random(), Math.random() ];

    //Choose a random final function
    var final = Math.floor( Math.random() * funcs.length );
    var cfinal = Math.floor( Math.random() * funcs.length );
    //rotations
    var rot = Math.floor( Math.random() * 3 );

    var firstPass = true;
    function iterate() {
        for( var i = 0; i < frameStep; i++ ) {
            w = weightedRand( weights );

            //random
            p = runFunc( w, p[0], p[1] );
            //final
            p = runFunc( final, p[0], p[1] );
            //Stretch to fit canvas
            pn = [ Math.floor( ( p[0] + 2 ) * ( canvasWidth / 4 ) ), Math.floor( ( p[1] + 2 ) * ( canvasHeight / 4 ) ) ];
            
            //Rotate for symmetry
            //Ugly - clean this up
            
            if( rot == 1 ) {
                if( i%2 == 0 )
                    pn = rotatePoint( pn, Math.PI );
            }
            else if( rot == 2 ) {
                if( i%3 == 0 )
                    pn = rotatePoint( pn, 2 * Math.PI / 3 );
                else if( i%2 == 0 )
                    pn = rotatePoint( pn, 4 * Math.PI / 3 );
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
        
        if( stepCount <= steps ) {
            ctx.putImageData( imgData, 0, 0 );
            window.requestAnimationFrame( iterate );
        }
    }
    iterate();

    function weightedRand( weights ) {
        var rand = Math.random();
        var w = 0;
        for( var i = 0; i < weights.length; i++ ) {
            w += weights[i];
            if( rand <= w ) return i;
        }
        return 0;
    }

    function rotatePoint( p, angle ) {
        p[0] -= canvasWidth/2;
        p[1] -= canvasHeight/2;

        var xnew = p[0] * Math.cos( angle ) - p[1] * Math.sin( angle );
        var ynew = p[0] * Math.sin( angle ) + p[1] * Math.cos( angle );

        return [ Math.floor( xnew + canvasWidth/2 ), Math.floor( ynew + canvasHeight/2 ) ];
        //return [ xnew, ynew ];
    }

};