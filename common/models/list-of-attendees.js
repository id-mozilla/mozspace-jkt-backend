'use strict';

module.exports = function(Listofattendees) {
  Listofattendees.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      const app = Listofattendees.app;
      const Participant = app.models.Participant;
      const Event = app.models.Event;

      // get user info
      Participant.findById(ctx.instance.participantId).then(participant => {

        if (participant) {
          const userJoined = new Date(participant.createdAt);
          const now = new Date();
          // get event info

          Event.findById(ctx.instance.eventId).then(anEvent => {
            const eventStart = new Date(anEvent.startDateTime);
            if (userJoined.getTime() < eventStart.getTime()) {
              app.io.emit('joined-participant', participant);
            } else {
              app.io.emit('new-participant', participant);
            }
          }) 
        }
      });
    }
    next();
  });
};
