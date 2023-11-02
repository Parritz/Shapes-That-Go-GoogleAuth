Math.clamp = function (value, min, max) {
	return Math.min(Math.max(value, min), max);

};

// Obtient une interpolation linéaire entre 2 valeurs
Math.lerp = function (value1, value2, amount) {
    if(!value1 <= value2){
	    amount = amount < 0 ? 0 : amount;
	    amount = amount > 1 ? 1 : amount;
	    return value1 + (value2 - value1) * amount;
    } else {

        return value1;

    }
};