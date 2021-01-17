const {
  v1: uuidv1
} = require('uuid');

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
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

  checkConfidence: (confi) => {
    if (confi > 0 && confi <= 1 && typeof confi !== 'string') {
      return true
    } else {
      return false
    }
  },

  checkPosture: (xWaarde, yWaarde) => {
    if (xWaarde < 320 && xWaarde >= 0 && yWaarde < 240 && yWaarde >= 0) {
      return 1
    } else if (xWaarde < 320 && xWaarde >= 0 && yWaarde >= 240 && yWaarde <= 480) {
      return 2
    } else if (xWaarde >= 320 && xWaarde <= 640 && yWaarde < 240  && yWaarde >= 0) {
      return 3
    } else if (xWaarde >= 320 && xWaarde <= 640 && yWaarde >= 240 && yWaarde <= 480) {
      return 4
    } else {
      return 5
    }
  },


  /*   sanitiseData: (data) => {
      let sanitiseData = [{
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }];


      return sanitiseData;
    } */

  /*   checkTitle: (title) => {
      if(typeof title !== 'string'){
        return false;
      }
      if (title[0] === title[0].toUpperCase() && title.length < 100 && typeof title == 'string') {
        return title;
      } else {
        return false;
      }
    } */
};

module.exports = Helpers;