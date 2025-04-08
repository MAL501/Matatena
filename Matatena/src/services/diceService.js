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

//TODO: puntuación = número de dados del mismo palo * suma del valor de los dados del mismo palo 
export const pointsColumn = (column) =>{
    let points = 0;
    column.forEach((dice) => {
        points += dice;
        console.log("Puntos: ", points);
    });
    return points;
}

export const removeDices = (opponent_column, dice) =>{
    opponent_column.forEach((opponent_dice, index) => {
        if(opponent_dice === dice){
            opponent_column.splice(index, 1);
        }
    });
    
    return opponent_column;
}