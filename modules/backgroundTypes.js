import { TYPES_COLORS } from "./globalVariables";

function backgroundTypes(pokemonTypes) {
  let background = TYPES_COLORS[pokemonTypes[0].type.name];
  if (pokemonTypes.length > 1) {
    let colors = [];
    pokemonTypes.forEach((typeObj) => {
      colors.push(TYPES_COLORS[typeObj.type.name]);
    });
    background = `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
  }
  return background;
}

export default backgroundTypes;
