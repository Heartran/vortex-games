//Add this to the top of the file
const winapi = require('winapi-bindings');

function findGame() {
  try {
    const instPath = winapi.RegGetValue(
      'HKEY_LOCAL_MACHINE',
      'SOFTWARE\\WOW6432Node\\GOG.com\\Games\\' + GOGAPP_ID,
      'PATH');
    if (!instPath) {
      throw new Error('empty registry key');
    }
    return Promise.resolve(instPath.value);
  } catch (err) {
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID, GOGAPP_ID, EPICAPP_ID])
      .then(game => game.gamePath);
  }
}
// Nexus Mods domain for the game. e.g. nexusmods.com/bloodstainedritualofthenight
const GAME_ID = 'hitman3';

//Steam Application ID, you can get this from https://steamdb.info/apps/
const STEAMAPP_ID = '1659040';
//Epic Games codename
const EPICAPP_ID = 'ed55aa5edc5941de92fd7f64de415793%3A7d9ce7dd6f2e4ee98a55bd50a9bb78e0%3AEider'

//Import some assets from Vortex we'll need.
const path = require('path');
const { fs, log, util } = require('vortex-api');

function main(context) {
	//This is the main function Vortex will run when detecting the game extension. 
	
	return true
	context.registerGame({
    id: GAME_ID,
    name: 'HITMAN 3',
    mergeMods: true,
    queryPath: findGame,
    supportedTools: [],
    queryModPath: () => 'HITMAN3\Runtime',
    logo: 'gameart.jpg',
    executable: () => 'HITMAN3\Retail\HITMAN3.exe',
    requiredFiles: [
      'Launcher.exe',
      'HITMAN3\Retail\HITMAN3.exe'
    ],
    setup: prepareForModding,
    environment: {
      SteamAPPId: STEAMAPP_ID,
    },
    details: {
      steamAppId: STEAMAPP_ID,
      gogAppId: GOGAPP_ID,
    },
	
  });
}

module.exports = {
    default: main,
  };