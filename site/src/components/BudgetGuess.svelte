<script>
  // Guess first, then see. The reader answers before the figure is shown,
  // which is the device two of this year's Webby data-visualisation
  // finalists used.
  //
  // Nothing is stored, scored, or sent anywhere. The answer exists only in
  // this browser tab, and the page says so.

  const TRUTH = 67;

  const CHOICES = [
    { pct: 25, label: 'About a quarter' },
    { pct: 45, label: 'Getting on for half' },
    { pct: 67, label: 'Two thirds' },
    { pct: 85, label: 'Most of it' },
  ];

  const SPLIT = [
    { label: 'Education',            value: 5.76, pct: 47.7, series: 1 },
    { label: 'Health & social services', value: 2.32, pct: 19.2, series: 2 },
    { label: 'Everything else',      value: 4.00, pct: 33.1, series: 6 },
  ];

  let picked = $state(null);
  const answered = $derived(picked !== null);
  const gap = $derived(picked === null ? 0 : TRUTH - picked);
</script>

<div class="guess">
  <p class="guess__q">
    Of the $12.08&nbsp;billion the legislature actually controls, how much goes to
    education and health together?
  </p>

  <div class="guess__choices" role="group" aria-label="Your guess">
    {#each CHOICES as c}
      <button
        class="guess__choice"
        class:is-picked={picked === c.pct}
        class:is-dim={answered && picked !== c.pct}
        aria-pressed={picked === c.pct}
        onclick={() => (picked = c.pct)}
      >
        <span class="guess__pct tabular">{c.pct}%</span>
        <span class="guess__lab">{c.label}</span>
      </button>
    {/each}
  </div>

  {#if answered}
    <div class="guess__reveal">
      <p class="guess__verdict">
        {#if gap === 0}
          You had it exactly. It is <strong>two&nbsp;thirds</strong>.
        {:else if Math.abs(gap) <= 22}
          You said <strong>{picked}%</strong>. It is <strong>67%</strong> &mdash;
          {Math.abs(gap)} points {gap > 0 ? 'higher' : 'lower'} than you thought.
        {:else}
          You said <strong>{picked}%</strong>. It is <strong>67%</strong> &mdash;
          {Math.abs(gap)} points {gap > 0 ? 'higher' : 'lower'} than you thought.
        {/if}
      </p>

      <ul class="guess__bars">
        {#each SPLIT as s}
          <li class="guess__bar">
            <div class="guess__barhead">
              <span class="guess__barlab">{s.label}</span>
              <span class="guess__barval tabular">${s.value.toFixed(2)}B &middot; {s.pct}%</span>
            </div>
            <div class="guess__track">
              <div
                class="guess__fill"
                style={`width:${s.pct}%;background:var(--series-${s.series})`}
              ></div>
            </div>
          </li>
        {/each}
      </ul>

      <p class="guess__note">
        FY2026 appropriations. Source: Oklahoma Policy Institute, FY2026 Budget
        Highlights; HB&nbsp;2766. Your answer stays in this browser — it is not
        saved, scored, or sent anywhere.
      </p>
    </div>
  {/if}
</div>

<style>
  .guess { width: 100%; }

  .guess__q {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.5rem, 3.4vw, 2.5rem);
    line-height: 1.1;
    letter-spacing: -0.03em;
    max-width: 24ch;
    color: var(--ink);
  }

  .guess__choices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(11rem, 100%), 1fr));
    gap: var(--s-3);
    margin-block-start: var(--s-6);
  }

  .guess__choice {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--s-1);
    padding: var(--s-4) var(--s-4) var(--s-5);
    background: var(--surface);
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    cursor: pointer;
    text-align: left;
    transition: border-color var(--dur) var(--ease),
                background var(--dur) var(--ease),
                opacity var(--dur) var(--ease);
  }

  .guess__choice:hover { border-color: var(--ink); }
  .guess__choice.is-picked { border-color: var(--ink); background: var(--ink); color: var(--paper); }
  .guess__choice.is-dim { opacity: 0.42; }

  .guess__pct {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.75rem, 3.6vw, 2.5rem);
    line-height: 1;
    letter-spacing: -0.035em;
  }

  .guess__lab { font-size: var(--t-small); color: inherit; opacity: 0.72; }

  .guess__reveal { margin-block-start: var(--s-7); }

  .guess__verdict {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.35rem, 2.8vw, 2rem);
    line-height: 1.15;
    letter-spacing: -0.03em;
    max-width: 30ch;
    color: var(--ink);
  }

  .guess__bars {
    list-style: none;
    padding: 0;
    display: grid;
    gap: var(--s-5);
    margin-block-start: var(--s-6);
  }

  .guess__barhead {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--s-4);
    margin-block-end: var(--s-2);
  }

  .guess__barlab { font-size: var(--t-small); font-weight: 500; }
  .guess__barval { font-size: var(--t-small); color: var(--ink-3); white-space: nowrap; }

  .guess__track {
    height: 10px;
    background: var(--paper-2);
    border-radius: 2px;
    overflow: hidden;
  }

  .guess__fill {
    height: 100%;
    border-radius: 2px 4px 4px 2px;
    animation: grow var(--dur-slow) var(--ease-out) both;
  }

  @keyframes grow { from { width: 0 !important; } }

  .guess__note {
    font-size: var(--t-micro);
    color: var(--ink-4);
    margin-block-start: var(--s-5);
    max-width: 60ch;
  }
</style>
