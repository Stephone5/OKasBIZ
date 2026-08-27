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
    padding: var(--s-7) var(--s-5);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--surface);
    text-align: center;
  }

  .counter__label {
    font-size: var(--t-micro);
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
    color: var(--ink-3);
  }

  .counter__value {
    font-family: var(--font-display);
    font-size: var(--t-display);
    line-height: var(--lh-tight);
    letter-spacing: var(--track-tight);
    margin-block: var(--s-3);
    color: var(--ink);
  }

  .counter__note {
    font-size: var(--t-micro);
    color: var(--ink-4);
    max-width: 44ch;
    margin-inline: auto;
  }
</style>
