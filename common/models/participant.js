'use strict';



module.exports = function(Participant) {
  Participant.observe('after save', function(ctx, next) {
    const app = Participant.app;

    console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
    if (ctx.isNewInstance) {
      app.io.emit('new-first-time-attendees', ctx);
    }
    next();
  });
};
