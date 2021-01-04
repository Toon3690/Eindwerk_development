const { v1: uuidv1 } = require('uuid');

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  checkTitle: (title) => {
    if(typeof title !== 'string'){
      return false;
    }
    if (title[0] === title[0].toUpperCase() && title.length < 100 && typeof title == 'string') {
      return title;
    } else {
      return false;
    }
  }
};

module.exports = Helpers;