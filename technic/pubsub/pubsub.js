
!function (root, factory) {

  var PubSub = {};
  root.PubSub = PubSub;
  factory(PubSub);

}(typeof window === 'object' ? window : global, function (PubSub) {

  var messages = {};
  var lastUid = -1;

  function publish(message, data) {
    message = (typeof message === 'symbol') ? message.toString() : message;

    var subscribers = messages[message];

    if (subscribers) {
      for (s in subscribers) {
        if (subscribers.hasOwnProperty(s)) {
          subscribers[s](data);
        }
      }
    }
  }

  PubSub.publish = function (message, data) {
    return publish(message, data);
  }

  PubSub.subscribe = function (message, callback) {
    message = (typeof message === 'symbol') ? message.toString() : message;
    if (!messages[message]) {
      messages[message] = {};
    }

    var token = 'uid' + String(++lastUid);
    messages[message][token] = callback;

    return token;
  }
})