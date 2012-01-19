var eQueue = function() {
    this.triggered = false;
    this.triggerQueue = [];
};

eQueue.prototype.push = function() {
    var args = Array.prototype.slice.call( arguments );

    if ( args.length > 0 ) {
        if ( this.triggered ) {
            args.shift().apply( null, args.length > 0 ? args : [] );
        } else {
            this.triggerQueue.push( { f: args.shift(), args: ( args.length > 0 ? args : [] ) } );
        }
    } else {
        throw 'not function argument supplied!';
    }
};

eQueue.prototype.trigger = function() {
    this.triggered = true;

    this.triggerQueue.map( function( value, key, all ) {
        value.f.apply( null, value.args );
    } );

};


module.exports = eQueue;