# Changelog

#### 0.0.3

- Separate `spring` from index, and allow spring callback to have 1 or 2
  args. If 1 receives `current`, if 2 receives `current` and `velocity`.
- Adds `tick` subscrition, that uses animation frame as signal and emits
   random.

#### 0.0.2

- Exposes AnimationHistory by default;
- Allows further overriding historyClass on main (to use
  TraversableAnimationHIstory);
- Exports spring and springWith to allow config.

#### 0.0.1

- Initial release
