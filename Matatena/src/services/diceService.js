export const getDice = () =>{
    return parseInt(Math.random()* 5 + 1) ;
}

export const addDiceToColumn = (column, dice) =>{
    if(column.length >= 2){
        return column;
    }

    column.push(dice);

    return column;
}

//La siguiente función tiene como objetivo activar un multiplicador en caso
//de que se repita un dado en la misma columna.
//El multiplicador será la suma de los dados del mismo palo * la cantidad de veces que se repita.
//además, se le sumará el valor de los dados que no se repitan
//Ejemplo: 1,1,1 => (1+1+1) * 3 = 9

export const pointsColumn = (column) => {
    if (column.length === 0) {
        return 0;
    }

    let points = 0;
    const counts = {}; 

    column.forEach((dice) => {
        counts[dice] = (counts[dice] || 0) + 1;
    });

    for (const [dice, count] of Object.entries(counts)) {
        if (count > 1) {
            points += (Number(dice) * count) * count; 
        } else {
            points += Number(dice); 
        }
    }

    return points;
};

export const removeDices = (opponent_column, dice) =>{
    opponent_column.forEach((opponent_dice, index) => {
        if(opponent_dice === dice){
            opponent_column.splice(index, 1);
        }
    });
    
    return opponent_column;
}