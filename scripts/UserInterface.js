function UserInterface( fractalinferno ) {

    $( '#helptoggle' ).on( 'click', function() {
        $( '#help' ).stop(true, true)
        .animate( {
            height: 'toggle',
            opacity: 'toggle'
        }, 500 );
    } );


    var randomDiv = $( '<div/>' )
    .attr( 'id', 'randomDiv' )
    .attr( 'class', 'active' )
    .text( 'Random' );
    $( 'body' ).append( randomDiv );

    var customDiv = $( '<div/>' )
    .attr( 'id', 'customDiv' )
    .text( 'Custom' );
    $( 'body' ).append( customDiv );

    var rfunctionsDiv = $( '<div/>' )
        .attr( 'id', 'rfunctionsDiv' )
        .attr( 'class', 'scrollbar' );
    $( 'body' ).append( rfunctionsDiv );

    for( var i = 0; i < fractalinferno.varisNames.length; i++ ) {
        var rfunction = $( '<div/>' )
        .attr( 'class', 'rfunction' )
        .text( fractalinferno.varisNames[i] );
        rfunctionsDiv.append( rfunction );

        rfunction.on( 'click', function() {
            $(this).toggleClass( 'active' );
        } );
    }
    
    var functionsDiv = $( '<div/>' )
        .attr( 'id', 'functions' )
        .attr( 'class', 'scrollbar' );
    $( 'body' ).append( functionsDiv );

    randomDiv.on( 'click', function() {
        $(this).addClass( 'active' );
        customDiv.removeClass( 'active' );
        functionsDiv.hide();
        preIterateDiv.hide();
        rfunctionsDiv.show();
    } );

    customDiv.on( 'click', function() {
        $(this).addClass( 'active' );
        randomDiv.removeClass( 'active' );
        rfunctionsDiv.hide();
        functionsDiv.show();
        preIterateDiv.show();
    } );

    var functionsAddDiv = $( '<div/>' )
        .attr( 'id', 'functionsAdd' )
        .text( '+' );
    $( '#functions' ).append( functionsAddDiv );

    functionsAddDiv.on( 'click', function() {
        addFunction();
        $( '#functions' ).append( functionsAddDiv );
    } );

    function addFunction() {
        var functionDiv = $( '<div/>' )
            .attr( 'class', 'function' );
        $( '#functions' ).append( functionDiv );

        var functionHeaderDiv = $( '<div/>' )
            .attr( 'class', 'functionHeader' )
            .text( 'F' );
        functionDiv.append( functionHeaderDiv );

            var functionWeight = $( '<input/>' )
                .attr( 'class', 'functionWeight' )
                .attr( 'type', 'number' )
                .attr( 'placeholder', 'weight' );
            functionHeaderDiv.append( functionWeight );

            var functionColor = $( '<input/>' )
                .attr( 'class', 'functionColor' )
                .attr( 'type', 'text' )
                .attr( 'placeholder', 'R,G,B' );
            functionHeaderDiv.append( functionColor );

            var functionDelete = $( '<div/>' )
                .attr( 'class', 'functionDelete' )
                .html( '&times;' );
            functionHeaderDiv.append( functionDelete );
            functionDelete.on( 'click', function() {  
                $(this).parent().parent().animate({
                    height: '0',
                    opacity: '0'
                }, 600, function() { $(this).remove(); } );
            } );
        
        var functionCofDiv = $( '<div/>' )
            .attr( 'class', 'functionCof' )
            .text( 'C' );
        functionDiv.append( functionCofDiv );

            var functionCof = $( '<input/>' )
                .attr( 'class', 'functionCofs' )
                .attr( 'type', 'text' )
                .attr( 'placeholder', 'a,b,c,d,e,f' );
            functionCofDiv.append( functionCof );


        var functionAddVarisDiv = $( '<div/>' )
            .attr( 'class', 'functionAddVaris' )
            .text( '+' );
        functionDiv.append( functionAddVarisDiv );
        
        functionAddVarisDiv.on( 'click', (function(f,fAV) {
            return function() {
                addVarianceToFunction( f );
                f.append( fAV );
                $( '#functions' ).append( $( '#functionsAdd' ) );
            }
        })(functionDiv,functionAddVarisDiv) );

        functionAddVarisDiv.click();
    }

    function addVarianceToFunction( functionDiv ) {
        var functionVarisDiv = $( '<div/>' )
            .attr( 'class', 'functionVaris' )
            .text( 'V' );
        functionDiv.append( functionVarisDiv );

            var functionVarisName = $( '<select/>' )
                .attr( 'class', 'functionVarisNames' );
            for( var i = 0; i < fractalinferno.varisNames.length; i++ ) {
                var option = $( '<option/>' )
                    .attr( 'value', fractalinferno.varisNames[i] )
                    .text( fractalinferno.varisNames[i] );
                functionVarisName.append( option );
            }
            functionVarisDiv.append( functionVarisName );

            var functionVarisWeight = $( '<input/>' )
                .attr( 'class', 'functionVarisWeight' )
                .attr( 'type', 'number' )
                .attr( 'placeholder', 'weight' );
            functionVarisDiv.append( functionVarisWeight );

            var varisDelete = $( '<div/>' )
                .attr( 'class', 'varisDelete' )
                .html( '&times;' );
            functionVarisDiv.append( varisDelete );
            varisDelete.on( 'click', function() {  
                $(this).parent().animate({
                    height: '0',
                    opacity: '0'
                }, 600, function() { $(this).remove(); } );
            } );
    }


    function getFractalJSON() {
        var fractalJSON = [];
        //Random
        if( $( '#randomDiv' ).hasClass( 'active' ) ) {
            fractalJSON.push( 'random' );
            $( '#rfunctionsDiv .rfunction' ).each( function() {
                if( $(this).hasClass( 'active' ) ) {
                    fractalJSON.push( $(this).text() );
                }
            } );
        }
        //Custom
        else {
            fractalJSON.push( 'custom' );
            $( '#functions .function' ).each( function() {
                var functionWeight = parseFloat( $(this).find( '.functionWeight' ).val() );
                var functionColor = $(this).find( '.functionColor' ).val().split( ',' ).map(Number);
                var functionsCofs = $(this).find( '.functionCofs' ).val().split( ',' ).map(Number);
                var functionVarisNames = [];
                var functionVarisWeights = [];
                $(this).find( '.functionVaris' ).each( function(){
                    functionVarisNames.push( $(this).find( '.functionVarisNames :selected' ).val() );
                    functionVarisWeights.push( parseFloat( $(this).find( '.functionVarisWeight' ).val() ) );
                } );
                if( !isNaN( functionWeight ) ) {
                    fractalJSON.push( {
                        weight: functionWeight,
                        col: functionColor,
                        c: functionsCofs,
                        v: functionVarisNames,
                        w: functionVarisWeights
                    } );
                }
            } );
        }
        return fractalJSON;
    }
    function getFractalParams() {
        var final = parseInt( $( '#preIterateFunction' ).val() ) || -1;
        var cfinal = parseInt( $( '#preIterateColor' ).val() ) || -1;
        var rot = parseFloat( $( '#preIterateRot' ).val() ) || 1;
        if( $( '#randomDiv' ).hasClass( 'active' ) ) {
            return {
                final: -1,
                cfinal: -1,
                rot: rot
            }
        }
        return {
            final: final,
            cfinal: cfinal,
            rot: rot
        }
    }


    var preIterateDiv = $( '<div/>' )
        .attr( 'id', 'preIterate' );
    $( 'body' ).append( preIterateDiv );

        var preIterateFunction = $( '<input/>' )
            .attr( 'id', 'preIterateFunction' )
            .attr( 'type', 'number' )
            .attr( 'placeholder', 'final func' );
        preIterateDiv.append( preIterateFunction );

        var preIterateColor = $( '<input/>' )
            .attr( 'id', 'preIterateColor' )
            .attr( 'type', 'number' )
            .attr( 'placeholder', 'final color' );
        preIterateDiv.append( preIterateColor );

    var preIterateRot = $( '<input/>' )
        .attr( 'id', 'preIterateRot' )
        .attr( 'type', 'number' )
        .attr( 'placeholder', 'rotation' );
    $( 'body' ).append( preIterateRot );


    var iterateButton = $( '<div/>' )
        .attr( 'id', 'iterateButton' )
        .text( 'New' );
    $( 'body' ).append( iterateButton );

    iterateButton.on( 'click', function() {
        fractalinferno.makeFuncs( getFractalJSON() );
        fractalinferno.makeParams( getFractalParams() );
        fractalinferno.begin();
    } );

    //Now on the left side
    var renderDiv = $( '<div/>' )
        .attr( 'id', 'renderDiv' );
    $( 'body' ).append( renderDiv );

        var renderHueShift = $( '<input/>' )
                .attr( 'id', 'renderHueShift' )
                .attr( 'type', 'number' )
                .attr( 'placeholder', 'hue shift' );
            renderDiv.append( renderHueShift );

        var renderSatShift = $( '<input/>' )
            .attr( 'id', 'renderSatShift' )
            .attr( 'type', 'number' )
            .attr( 'placeholder', 'sat shift' );
        renderDiv.append( renderSatShift );

        var renderLightShift = $( '<input/>' )
            .attr( 'id', 'renderLightShift' )
            .attr( 'type', 'number' )
            .attr( 'placeholder', 'light shift' );
        renderDiv.append( renderLightShift );

        var renderFreqThresh = $( '<input/>' )
                .attr( 'id', 'renderFreqThresh' )
                .attr( 'type', 'number' )
                .attr( 'placeholder', 'freq thresh' );
            renderDiv.append( renderFreqThresh );

        var renderGamma = $( '<input/>' )
                .attr( 'id', 'renderGamma' )
                .attr( 'type', 'number' )
                .attr( 'placeholder', 'gamma' );
            renderDiv.append( renderGamma );

    
    function getRenderParams() {
        var hueShift = parseFloat( $( '#renderHueShift' ).val() );
        var satShift = parseFloat( $( '#renderSatShift' ).val() );
        var lightShift = parseFloat( $( '#renderLightShift' ).val() );
        var freqThreshold = parseFloat( $( '#renderFreqThresh' ).val() );
        var gamma = parseFloat( $( '#renderGamma' ).val() );

        return {
            hueShift: hueShift,
            satShift: satShift,
            lightShift: lightShift,
            freqThreshold: freqThreshold,
            gamma: gamma
        }
    }
   
    var renderButton = $( '<div/>' )
        .attr( 'id', 'renderButton' )
        .text( 'Render' );
    $( 'body' ).append( renderButton );

    renderButton.on( 'click', function() {
        fractalinferno.stop();
        fractalinferno.render( getRenderParams() );
    } );

    var continueButton = $( '<div/>' )
        .attr( 'id', 'continueButton' )
        .text( 'Continue' );
    $( 'body' ).append( continueButton );

    continueButton.on( 'click', function() {
        fractalinferno.start();
    } );
    
}