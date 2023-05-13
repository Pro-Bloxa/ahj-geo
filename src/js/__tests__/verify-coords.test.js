import verifyCoords from "../verify-coords";

test.each([
  ["true", "55.7640498, 37.8387726", "55.7640498, 37.8387726"],
  ["true", "55.7640498,37.8387726", "55.7640498, 37.8387726"],
  ["true", "[55.7640498, 37.8387726]", "55.7640498, 37.8387726"],
  ["false", " ", false],
  ["null", "51.50678851,−012572", false],
])("%s", (_, coordinates, expected) => {
  const received = verifyCoords(coordinates);
  expect(received).toBe(expected);
});
