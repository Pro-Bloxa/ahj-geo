export default function verifyCoords(coords) {
  let data = coords;
  const regularForCoords =
    /^[-—–−-]?[0-9]{1,2}\.[0-9]+, [-—–−-]?[0-9]{1,2}\.[0-9]+/;

  if (data.includes("[") && data.includes("]")) {
    data = data.slice(data.indexOf("[") + 1, data.indexOf("]"));
  }

  if (data.includes(" ")) {
    if (regularForCoords.test(data)) {
      return data;
    }
    return false;
  }

  const latitude = data.slice(0, data.indexOf(","));
  const longitude = data.slice(data.indexOf(",") + 1);
  data = `${latitude}, ${longitude}`;

  if (regularForCoords.test(data)) {
    return data;
  }
  return false;
}
