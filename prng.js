( function( window, undefined ){

	window.RNG = function(min, max){
		
		if( min / 1 != min )
		{
			throw new TypeError('Excepting Number or NumericString, got ' + ( min != min ? 'NaN' : typeof min ) );
		}
		if(arguments.length > 1)
		{
			if( max / 1 != max )
			{
				throw new TypeError('Excepting Number or NumericString as the second parameter, got ' + typeof max);
			}
			else if( ( min = min >> 0 ) >= ( max = max >> 0 ) )
			{
				throw new RangeError('The 2nd parameter should be higher than the first');
			}
		}
		else
		{
			max = min << 0;
			min = 0;
		}
		
		var dif = max - min, i, refill=function(){
			for(var i = min, result={length:0}; i <= max; i++)
			{
				result[i]=true;
				result.length++;
			}
			return result;
		}, avail = refill();
		
		return {
			valueOf:function(){
				if( !avail.length )
				{
					avail = refill();
				}
				
				if( avail.length > 1 )
				{
					var result;
					do
					{
						result = ( window.Math.random() * ( dif + 1 ) + min ) << 0;
					}
					while( !avail[result] );
					
					delete avail[result];
					avail.length--;
					
					return result;
				}
				else
				{
					for(var k in avail)
					{
						if(k != 'length')
						{
						    break;
						}
					}
					
					
				    avail = refill();
				    
					return k / 1;
					
				}
			},
			toString:function(){
				return this.valueOf() + '';
			}
		};
		
	};

} )( Function('return this')() );
