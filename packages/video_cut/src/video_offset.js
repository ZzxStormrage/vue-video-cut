/* eslint-disable no-unused-vars */
/*! @name videojs-offset @version 2.1.0 @license MIT */
import videojs from 'video.js';

var version = "2.1.0";

var defaults = {}; // Cross-compatibility for Video.js 5 and 6.

var registerPlugin = videojs.registerPlugin || videojs.plugin; // const dom = videojs.dom || videojs;

/**
 * Checks whether the clip should be ended.
 *
 * @function onPlayerTimeUpdate
 *
 */

var onPlayerTimeUpdate = function onPlayerTimeUpdate() {
    var curr = this.currentTime();

    if (curr < 0) {
        this.currentTime(0);
        this.play();
    }
    // console.log('this._offsetEnd', this._offsetEnd);
    // console.log('curr', curr);
    // console.log('this._offsetStart', this._offsetStart);

    if (this._offsetEnd > 0 && curr > this._offsetEnd - this._offsetStart) {
        this.off('timeupdate', onPlayerTimeUpdate);
        this.pause();
        this.trigger('ended');
        console.log('this._restartBeginning', this._restartBeginning);

        if (!this._restartBeginning) {
            this.currentTime(this._offsetEnd - this._offsetStart);
        } else {
            this.trigger('loadstart');
            this.currentTime(0);
        }
    }
};
/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */


var onPlayerReady = function onPlayerReady(player, options) {
    player.one('play', function () {
        player.on('timeupdate', onPlayerTimeUpdate);
    });
};
/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function offset
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */


var offset = function offset(options) {
    var _this = this;

    options = options || {};
    var Player = this.constructor;
    this._offsetStart = parseFloat(options.start || '0');
    this._offsetEnd = parseFloat(options.end || '0');

    this._restartBeginning = options.restart_beginning || false;

    if (!Player.__super__ || !Player.__super__.__offsetInit) {
        Player.__super__ = {
            __offsetInit: true,
            duration: Player.prototype.duration,
            currentTime: Player.prototype.currentTime,
            bufferedPercent: Player.prototype.bufferedPercent,
            remainingTime: Player.prototype.remainingTime
        };

        Player.prototype.duration = function () {
            if (this._offsetEnd > 0) {
                return this._offsetEnd - this._offsetStart;
            }

            return Player.__super__.duration.apply(this, arguments) - this._offsetStart;
        };

        Player.prototype.currentTime = function (seconds) {

            var num = seconds + this._offsetStart
            if (isNaN(num)) {
                num = 0
            }

            if (seconds !== undefined) {
                return Player.__super__.currentTime.call(this, num);
            }

            return Player.__super__.currentTime.apply(this) - this._offsetStart;
        };

        Player.prototype.remainingTime = function () {
            return this.duration() - this.currentTime();
        };

        Player.prototype.startOffset = function () {
            return this._offsetStart;
        };

        Player.prototype.endOffset = function () {
            if (this._offsetEnd > 0) {
                return this._offsetEnd;
            }

            return this.duration();
        };
    }

    this.ready(function () {
        onPlayerReady(_this, videojs.mergeOptions(defaults, options));
    });
}; // Register the plugin with video.js.


registerPlugin('offset', offset); // Include the version number.

offset.VERSION = version;

export default offset;