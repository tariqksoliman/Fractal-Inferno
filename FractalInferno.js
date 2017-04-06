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
    ]

    function randomizeVaris() {
        var cofMult = 1;
        var cofSub = 0.5;
        var weights = [];

        var totalSum = 0;
        var weightInc = 0.05;
        //Make an array of weights that add up to 1;
        for( var i = 0; i < varis.length; i++ ) {
            weights.push( 0 );
        }
        //Keep add weightInc randomly until the sum is one
        while( totalSum < 1 ) {
            weights[ Math.floor( Math.random() * varis.length ) ] += weightInc;
            totalSum += weightInc;
        }
        //weights = [ 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5 ].reverse();


        //Fill in variable frac data
        for( var i = 0; i < varis.length; i++ ) {
            varis[i].col = [ Math.random(), Math.random(), Math.random() ];
            varis[i].cofs = [  Math.random() * cofMult - cofSub,
                            Math.random() * cofMult - cofSub,
                            Math.random() * cofMult - cofSub,
                            Math.random() * cofMult - cofSub,
                            Math.random() * cofMult - cofSub,
                            Math.random() * cofMult - cofSub ];
            varis[i].w = weights[i];
        }

        return weights;

    }

    var weights = randomizeVaris();

    var canvas = document.getElementById( 'canvas' );
    var canvasWidth = canvas.width = window.innerWidth;
    var canvasHeight = canvas.height = window.innerHeight;
    canvasWidth = canvas.width = canvasHeight;
    var ctx = canvas.getContext( '2d' );
    ctx.imageSmoothingEnabled = false;
    var imgData = ctx.createImageData( canvasWidth, canvasHeight );

    var steps = 100000000;
    var stepCount = 0;
    var frameStep = 25000;
    //Choose random point
    var p = [ 2 * Math.random() - 1, 2 * Math.random() - 1 ];
    var pS;
    //For mapping unto canvas
    var pn = [ 0, 0 ];

    var w = 0;
    //Choose a random color
    var c = [ Math.random(), Math.random(), Math.random() ];

    //Choose a random final function
    var final = Math.floor( Math.random() * varis.length );
    var cfinal = Math.floor( Math.random() * varis.length );
    //rotations
    var rot = Math.floor( Math.random() * 3 );

    var firstPass = true;
    function iterate() {
        for( var i = 0; i < frameStep; i++ ) {
            w = weightedRand( weights );

            //random
            p = varis[w].f( p[0], p[1] );
            //p[0] = varis[w].cofs[0] * pS[0] + varis[w].cofs[1] * pS[1] + varis[w].cofs[2];
            // p[1] = varis[w].cofs[3] * pS[0] + varis[w].cofs[4] * pS[1] + varis[w].cofs[5];

            //final
            pS = varis[final].f( p[0], p[1] );
            p[0] = varis[w].cofs[0] * pS[0] + varis[w].cofs[1] * pS[1] + varis[w].cofs[2];
            p[1] = varis[w].cofs[3] * pS[0] + varis[w].cofs[4] * pS[1] + varis[w].cofs[5];
            //p = rotatePoint( p, Math.PI );

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
            c[0] = ( ( c[0] + varis[w].col[0] ) / 2 );
            c[1] = ( ( c[1] + varis[w].col[1] ) / 2 );
            c[2] = ( ( c[2] + varis[w].col[2] ) / 2 );
            //Colors final pass
            c[0] = ( ( c[0] + varis[cfinal].col[0] ) / 2 );
            c[1] = ( ( c[1] + varis[cfinal].col[1] ) / 2 );
            c[2] = ( ( c[2] + varis[cfinal].col[2] ) / 2 );
            
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