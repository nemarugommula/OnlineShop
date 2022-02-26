function formatLabel(label) {
  var names = label.split("_");
  var res = capitalizeFirstLetter(names[0]);
  return res;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default formatLabel;
