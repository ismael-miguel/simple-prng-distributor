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
            throw new TypeError( 'Expecting Number or NumericString, got ' + ( min != min ? 'NaN' : ( min - 1 == min ? 'Infinity' : typeof min) ) );
        }
        if ( arguments.length > 1 )
        {
            if ( nan( max ) )
            {
                throw new TypeError( 'Expecting Number or NumericString as the second parameter, got ' + typeof max );
            }
			/*
			 * converts the numbers to integers ( n>>=0 -> n = n >> 0)
			 * and check if the minimum is higher than the maximum,
			 * throwing an exception if that is the case
			 */
            else if ( ( min >>= 0 ) >= ( max >>= 0 ) )
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
