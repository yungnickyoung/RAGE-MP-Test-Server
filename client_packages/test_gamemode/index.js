// mp.game.streaming.requestIpl('rc12b_hospitalinterior');
// mp.game.streaming.requestIpl('rc12b_hospitalinterior_lod');
// mp.game.streaming.requestIpl('rc12b_default');
// mp.game.streaming.requestIpl('rc12b_fixed');
// mp.game.streaming.requestIpl('facelobbyfake');
// mp.game.streaming.requestIpl('facelobbyfake_lod');
// mp.game.streaming.requestIpl('fakeint');
// mp.game.streaming.requestIpl('fiblobbyfake');
// mp.game.streaming.requestIpl('jewel2fake');
// mp.game.streaming.requestIpl('sp1_10_fake_interior');

mp.events.add('loadinterior', (x, y, z, ipl) => {
  const interior = mp.game.interior.getInteriorAtCoords(x, y, z);
  // mp.game.streaming.requestIpl(`"${ipl}"`);
  mp.game.interior.refreshInterior(interior);
});
