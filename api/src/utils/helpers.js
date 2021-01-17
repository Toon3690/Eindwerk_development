const {
  v1: uuidv1
} = require('uuid');

const {
  v4: uuidv4
} = require('uuid');

const Helpers = {

  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  generateUUID2: () => {
    const uuid = uuidv4();
    return uuid;
  },

  validateUUID: (uuid) => {
    if (uuid == undefined) {
      return false
    } else {
      if (uuid.length > 0 && typeof uuid == uuid) {
        return true
      } else {
        return false
      }
    }

  },

  checkPosture: (xWaarde, yWaarde) => {
    if (xWaarde < 320 && xWaarde >= 0 && yWaarde < 240 && yWaarde >= 0) {
      return 1
    } else if (xWaarde < 320 && xWaarde >= 0 && yWaarde >= 240 && yWaarde <= 480) {
      return 2
    } else if (xWaarde >= 320 && xWaarde <= 640 && yWaarde < 240 && yWaarde >= 0) {
      return 3
    } else if (xWaarde >= 320 && xWaarde <= 640 && yWaarde >= 240 && yWaarde <= 480) {
      return 4
    } else {
      return 5
    }
  },

};

module.exports = Helpers;