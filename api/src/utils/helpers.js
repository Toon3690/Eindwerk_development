const {
  v1: uuidv1
} = require('uuid');

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  validateUUID: (uuid) => {
    if (uuid.length > 0 && typeof uuid === 'string') {
      return true
    } else {
      return false
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
    if (xWaarde < 320 && yWaarde < 240) {
      return 1
    }else if (xWaarde < 320 && yWaarde >= 240) {
      return 2
    }else if (xWaarde >= 320 && yWaarde < 240) {
      return 3
    }else if (xWaarde >= 320 && yWaarde >= 240) {
      return 4
    }else{
      return 5
    }
  },


  /*   checkX: (xWaarde) => {
      if(xWaarde > 0 && xWaarde < 640 && typeof xWaarde !== 'string'){
        return true
      }else{
        return false
      }
    }, */

  /*   checkY: (yWaarde) => {
      if(yWaarde > 0 && yWaarde < 480){
        return true
      }else{
        return false
      }
    }, */


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