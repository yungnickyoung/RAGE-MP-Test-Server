/**
 * generateColShapes
 *
 * Creates all of the colshapes, as well as any variables, labels, or markers associated
 * with them.
 */
function generateColShapes() {
  const colCarStorage = mp.colshapes.newSphere(323, -215, 53, 2);
  const colCarStorageLabel = mp.labels.new("Press 'E' to access your vehicles", new mp.Vector3(323, -215, 53.5), { drawDistance: 5 });
  const colCarStorageMarker = mp.markers.new(1, new mp.Vector3(323, -215, 53), 2, { color: [255, 255, 255, 90] });
  colCarStorage.setVariable('name', 'colCarStorage');
}

generateColShapes();
