<script>
  // Derived from an annual figure, labelled as an estimate, no backend.
  // Resets on each 60-second cycle so it stays an illustration of rate
  // rather than a claim about a running total.
  let { perSecond = 4122 } = $props();

  let amount = $state(0);
  let started = $state(false);

  $effect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      amount = perSecond * 60;
      started = true;
      return;
    }

    // Value is derived from elapsed wall time rather than accumulated
    // frames, so it is correct on the first paint and stays correct after
    // a backgrounded tab throttles timers.
    const t0 = performance.now();
    const read = () => {
      const seconds = ((performance.now() - t0) / 1000) % 60;
      amount = Math.floor(seconds * perSecond);
      started = true;
    };

    read();
    const id = setInterval(read, 120);
    return () => clearInterval(id);
  });
</script>

<div class="counter">
  <p class="counter__label">Estimated dollars spent by Oklahomans since this page opened</p>
  <p class="counter__value tabular" aria-live="off">
    ${amount.toLocaleString('en-US')}
  </p>
  <p class="counter__note">
    About ${perSecond.toLocaleString('en-US')} per second &middot; roughly $130&nbsp;billion a
    year &middot; resets each 60-second cycle &middot; an estimate, not a measurement
  </p>
</div>

<style>
  .counter {
    padding: clamp(var(--s-7), 8vw, var(--s-9)) var(--s-5);
    border: 1px solid var(--rule-deep, var(--rule));
    border-radius: var(--radius-lg);
    background: var(--deep-2, var(--surface));
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* A single hairline sweep in the accent, marking the live figure. */
  .counter::before {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent) 35%,
      var(--accent) 65%,
      transparent
    );
  }

  .counter__label {
    font-size: var(--t-micro);
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
    color: var(--on-deep-2, var(--ink-3));
  }

  .counter__value {
    font-family: var(--font-display);
    font-size: clamp(3.25rem, 11vw, 8rem);
    line-height: var(--lh-tight);
    letter-spacing: -0.04em;
    margin-block: var(--s-5) var(--s-4);
    color: var(--on-deep, var(--ink));
  }

  .counter__note {
    font-size: var(--t-micro);
    color: #6f7681;
    max-width: 52ch;
    margin-inline: auto;
    line-height: 1.6;
  }
</style>
