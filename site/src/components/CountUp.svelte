<script>
  // Big figures count up from zero when they scroll into view. On a site
  // whose whole point is numbers, this is the one place motion carries
  // meaning rather than decorating.
  //
  // The final value renders on the server, so with no script — or if the
  // observer never fires — the correct number is simply there.

  let { value, prefix = '', suffix = '', decimals = 0, duration = 1100 } = $props();

  let shown = $state(value);
  let node;

  const fmt = (n) =>
    prefix +
    n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  $effect(() => {
    if (!node) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    if (document.visibilityState !== 'visible') return;

    let raf;
    const run = () => {
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        // ease-out cubic: fast then settling, so the last digits land softly
        const eased = 1 - Math.pow(1 - p, 3);
        shown = value * eased;
        if (p < 1) raf = requestAnimationFrame(step);
        else shown = value;
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        shown = 0;
        run();
      },
      { threshold: 0.4 }
    );

    io.observe(node);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  });
</script>

<span class="countup tabular" bind:this={node}>{fmt(shown)}</span>

<style>
  .countup { font-variant-numeric: tabular-nums; }
</style>
