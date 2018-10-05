'use strict';
const slug = require('slug');
var generate = require('nanoid/generate')

const sortByNewest = function(a, b) { return a < b }


module.exports = function(Event) {
  Event.observe('before save', (ctx, next) => {
    if (ctx.instance) {
      const randomId = generate('abcdefghijklmnopqrstuvwxyz', 3);
      ctx.instance.slug = slug(`${ctx.instance.title}-${randomId}`);
    }
    next();
  });

  Event.report = function (eventId, cb) {
    Event.findById(eventId, {
      include: ['participants'],
    }).then(event => {
      const eventObj = JSON.parse(JSON.stringify(event))
      const participants = eventObj.participants;
      const developer = participants.filter(participant => participant.isDeveloper)
      const eventStartDateTime = new Date(eventObj.startDateTime)
      const newParticipants = participants.filter(participant => {
        const participantJoined = new Date(participant.createdAt)
        return sortByNewest(eventStartDateTime.getTime(), participantJoined.getTime())
      })
      cb(null, participants.length, developer.length, newParticipants.length, participants.length - newParticipants.length)
    })
  }

  Event.remoteMethod('report', {
    http: {
      path: '/report',
      verb: 'GET',
    },
    accepts: [
      {
        arg: 'eventId',
        type: 'string',
      }
    ],
    returns: [
      {
        arg: 'total',
        type: 'number',
      },
      {
        arg: 'developer',
        type: 'number',
      },
      {
        arg: 'new',
        type: 'number',
      },
      {
        arg: 'old',
        type: 'number,'
      },
    ],
    description: 'participants report of an event',
  });
};
