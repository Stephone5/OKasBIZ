<script>
  // Posts to the same Google Form the previous site used, with the same
  // field ids and the same two choice values.
  //
  // The second choice value contains an apostrophe typo ("it's data").
  // It is kept exactly as-is on purpose: Google Forms only records a
  // multiple-choice answer when the submitted string matches the option
  // defined in the form. Correcting the spelling here would silently drop
  // every suggestion.
  const FORM =
    'https://docs.google.com/forms/d/e/1FAIpQLSfH9NoQwZp6OM3I6Mju2K3XLiFZozSZwigq0prk1VgC00ZZBg/formResponse';
  const FIELD_TYPE = 'entry.516347306';
  const FIELD_BODY = 'entry.1406336511';

  const CHOICES = [
    { key: 'Question',   value: 'Question about the data',           label: 'Question' },
    { key: 'Suggestion', value: "Suggestion for the site or it's data", label: 'Suggestion' },
  ];

  let open = $state(false);
  let kind = $state(null);
  let body = $state('');
  let status = $state('');
  let tone = $state('muted');

  const send = async () => {
    if (!kind) { status = 'Pick question or suggestion first.'; tone = 'warn'; return; }
    if (!body.trim()) { status = 'Add a message.'; tone = 'warn'; return; }

    status = 'Sending…';
    tone = 'muted';

    const data = new URLSearchParams();
    data.append(FIELD_TYPE, CHOICES.find((c) => c.key === kind).value);
    data.append(FIELD_BODY, `${body.trim()} [${location.pathname}]`);

    try {
      await fetch(FORM, { method: 'POST', mode: 'no-cors', body: data });
      status = 'Sent. Thank you.';
      tone = 'good';
      body = '';
      kind = null;
      setTimeout(() => { open = false; status = ''; }, 1800);
    } catch {
      // Surface the failure rather than showing a false success.
      status = 'That did not send. Please try again.';
      tone = 'warn';
    }
  };
</script>

<div class="fb">
  {#if open}
    <div class="fb__panel" role="dialog" aria-label="Send feedback">
      <div class="fb__head">
        <div>
          <strong>Help shape this site</strong>
          <span class="fb__sub">Anonymous · no sign-in</span>
        </div>
        <button class="fb__x" onclick={() => (open = false)} aria-label="Close">✕</button>
      </div>

      <div class="fb__choices">
        {#each CHOICES as c}
          <button
            class="fb__choice"
            class:is-on={kind === c.key}
            aria-pressed={kind === c.key}
            onclick={() => (kind = c.key)}
          >{c.label}</button>
        {/each}
      </div>

      <label class="visually-hidden" for="fb-msg">Your message</label>
      <textarea
        id="fb-msg"
        class="fb__text"
        maxlength="600"
        placeholder="What's on your mind?"
        bind:value={body}
      ></textarea>

      <button class="fb__send" onclick={send}>Send</button>
      <p class="fb__status" data-tone={tone}>{status}</p>
    </div>
  {/if}

  <button
    class="fb__toggle"
    aria-expanded={open}
    onclick={() => (open = !open)}
  >{open ? 'Close' : 'Feedback'}</button>
</div>

<style>
  .fb {
    position: fixed;
    inset-block-end: var(--s-5);
    inset-inline-end: var(--s-5);
    z-index: 80;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--s-3);
  }

  .fb__toggle {
    padding: var(--s-3) var(--s-5);
    border-radius: 999px;
    border: 1px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
    font-size: var(--t-small);
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
    transition: background var(--dur) var(--ease);
  }
  .fb__toggle:hover { background: var(--accent); }

  .fb__panel {
    width: min(21rem, calc(100vw - var(--s-6)));
    background: var(--surface);
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius-lg);
    padding: var(--s-5);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  }

  .fb__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--s-4);
    margin-block-end: var(--s-4);
  }
  .fb__head strong { display: block; font-size: var(--t-body); }
  .fb__sub { font-size: var(--t-micro); color: var(--ink-3); }

  .fb__x {
    background: none; border: 0; cursor: pointer;
    color: var(--ink-3); font-size: 1rem; line-height: 1; padding: 2px;
  }
  .fb__x:hover { color: var(--ink); }

  .fb__choices { display: flex; gap: var(--s-2); margin-block-end: var(--s-3); }

  .fb__choice {
    flex: 1;
    padding: var(--s-2) var(--s-3);
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius-sm);
    background: transparent;
    font-size: var(--t-small);
    cursor: pointer;
    transition: background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
  }
  .fb__choice:hover { border-color: var(--ink); }
  .fb__choice.is-on { background: var(--ink); border-color: var(--ink); color: var(--paper); }

  .fb__text {
    width: 100%;
    height: 5.5rem;
    resize: none;
    padding: var(--s-3);
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius-sm);
    background: var(--paper);
    font-size: var(--t-small);
  }

  .fb__send {
    width: 100%;
    margin-block-start: var(--s-3);
    padding: var(--s-3);
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--accent);
    color: #fff;
    font-size: var(--t-small);
    font-weight: 600;
    cursor: pointer;
  }
  .fb__send:hover { background: var(--ink); }

  .fb__status {
    min-height: 1.1rem;
    margin-block-start: var(--s-2);
    font-size: var(--t-micro);
    text-align: center;
  }
  .fb__status[data-tone='muted'] { color: var(--ink-3); }
  .fb__status[data-tone='warn']  { color: var(--series-6); }
  .fb__status[data-tone='good']  { color: var(--series-1); }

  .visually-hidden {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip-path: inset(50%); white-space: nowrap;
  }

  @media print { .fb { display: none; } }
</style>
