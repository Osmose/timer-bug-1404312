const {utils: Cu} = Components;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "Log", "resource://gre/modules/Log.jsm");
XPCOMUtils.defineLazyServiceGetter(this, "timerManager",
  "@mozilla.org/updates/timer-manager;1", "nsIUpdateTimerManager");

this.install = function() {};

this.startup = async function() {
  const ts = Date.now();
  const logger = Log.repository.getLogger("timer-bug-1404312");
  logger.addAppender(new Log.ConsoleAppender(new Log.BasicFormatter()));
  logger.level = 0;

  logger.debug("Registering timer with duration of 2 minutes.");
  timerManager.registerTimer(`timer-bug-1404312-2min-${ts}`, () => {
    logger.debug("2 minute timer has triggered.");
  }, 120);
  logger.debug("Registering timer with duration of 1 hour.");
  timerManager.registerTimer(`timer-bug-1404312-1hour-${ts}`, () => {
    logger.debug("1 hour timer has triggered.");
  }, 3600);
};

this.shutdown = function() {};

this.uninstall = function() {};
