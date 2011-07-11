window.addEventListener('load', function(e) {

  var startCookieKey = 'barkeepStartedLoadingTime';

  var createCookie = function(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  };

  var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };

  var deleteCookie = function(name) {
    createCookie(name,"",-1);
  };

  window.addEventListener('beforeunload', function(e) {
    var startLoadingTime = new Date();
    createCookie(startCookieKey, startLoadingTime, 1);
  });

  (function() {
    var finishedLoadingTime = new Date();
    var startLoadingTime = readCookie(startCookieKey);
    deleteCookie(startCookieKey);

    if (!startLoadingTime) return true;

    var totalMs = finishedLoadingTime.valueOf() - new Date(startLoadingTime).valueOf();

    console.log(totalMs);

    return true;
  })();
});

