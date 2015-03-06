( function ( window ) {

	window.RNG = function ( min, max ) {	

		var nan = function ( val ) {
				/*
				 * Checks if the value is an usable number or NaN or Infinity
				 * When dividing by 1, it will convert the value to a number or NaN
				 * NaN values return false when compared with themselves ( NaN != NaN returns true)
				 *
				 * The 2nd part of the verification will check if the value is infinite
				 * Infinity will return Infinity if you sum or subtract 1
				 * E.g.: Infinity - 1 == Infinity --> returns true
				 */
				return ( ( val / 1 ) != ( val / 1 ) ) || ( val - 1 == val );
			},
			//will contain all the available numbers
			avail = [];

		if ( nan( min ) )
		{
			throw new TypeError( 'Expecting Integer, got ' + ( min != min ? 'NaN' : ( min - 1 == min ? 'Infinity' : typeof min) ) );
		}
		else if ( min != min >> 0 )
		{
			throw new TypeError( 'Floating-point numbers aren\'t supported' );
		}
		
		if ( arguments.length > 1 )
		{
			if ( nan( max ) )
			{
				throw new TypeError( 'Expecting Integer as the second parameter, got ' + typeof max );
			}
			else if( max != max >> 0 )
			{
				throw new TypeError( 'Floating-point numbers aren\'t supported on the 2nd parameter' );
			}
			else if ( min >= max )
			{
				throw new RangeError( 'The 2nd parameter should be higher than the first' );
			}
			else if ( ( max - min ) > 268435455 )
			{
				//big numbers crash hard, so we must stop them before
				throw new RangeError( 'The difference between ' + max + ' and ' + min + ' is higher than ' + 268435455 );
			}
		}
		else
		{
			max = min >> 0;
			min = 0;
		}

		return {
			valueOf: function ( ) {

				if( !avail.length )
				{
					for( var i = 0; i <= max - min; i++ )
					{
						avail[i] = min + i;
					}
				}

				if( avail.length > 1 )
				{
					//returns a random element between 0 and avail.length (excluded)
					return avail.splice( ( window.Math.random() * avail.length ) >> 0 ,1)[0];
				}
				else
				{
					return avail.splice(0,1)[0];
				}

			},
			toString: function ( ) {
				return this.valueOf() + '';
			}
		};

	};

} )( Function('return this')( ) );
