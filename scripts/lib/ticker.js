let tickerActive = false

export function ticker() {
  let getTime = Date.now
  let lagThreshold = 500
  let adjustedLag = 33
  let startTime = getTime()
  let lastUpdate = startTime
  let gap = 1000 / 240
  let nexTime = gap
  let listeners = []
  let id = null
  let req = null
  let raf = null
  let self = null
  let delta = null
  let i = nul
}

_tickerActive,
	_ticker = (function() {
		let _getTime = Date.now,
			_lagThreshold = 500,
			_adjustedLag = 33,
			_startTime = _getTime(),
			_lastUpdate = _startTime,
			_gap = 1000 / 240,
			_nextTime = _gap,
			_listeners = [],
			_id, _req, _raf, _self, _delta, _i,
			_tick = v => {
				let elapsed = _getTime() - _lastUpdate,
					manual = v === true,
					overlap, dispatch, time, frame;
				elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
				_lastUpdate += elapsed;
				time = _lastUpdate - _startTime;
				overlap = time - _nextTime;
				if (overlap > 0 || manual) {
					frame = ++_self.frame;
					_delta = time - _self.time * 1000;
					_self.time = time = time / 1000;
					_nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
					dispatch = 1;
				}
				manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
				if (dispatch) {
					for (_i = 0; _i < _listeners.length; _i++) { // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
						_listeners[_i](time, _delta, frame, v);
					}
				}
			};
		_self = {
			time:0,
			frame:0,
			tick() {
				_tick(true);
			},
			deltaRatio(fps) {
				return _delta / (1000 / (fps || 60));
			},
			wake() {
				if (_coreReady) {
					if (!_coreInitted && _windowExists()) {
						_win = _coreInitted = window;
						_doc = _win.document || {};
						_globals.gsap = gsap;
						(_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
						_install(_installScope || _win.GreenSockGlobals || (!_win.gsap && _win) || {});
						_raf = _win.requestAnimationFrame;
					}
					_id && _self.sleep();
					_req = _raf || (f => setTimeout(f, (_nextTime - _self.time * 1000 + 1) | 0));
					_tickerActive = 1;
					_tick(2);
				}
			},
			sleep() {
				(_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
				_tickerActive = 0;
				_req = _emptyFunc;
			},
			lagSmoothing(threshold, adjustedLag) {
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			},
			fps(fps) {
				_gap = 1000 / (fps || 240);
				_nextTime = _self.time * 1000 + _gap;
			},
			add(callback) {
				_listeners.indexOf(callback) < 0 && _listeners.push(callback);
				_wake();
			},
			remove(callback, i) {
				~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
			},
			_listeners:_listeners
		};
		return _self;
	})(),
	_wake = () => !_tickerActive && _ticker.wake(), //also ensures the core classes are initialized.