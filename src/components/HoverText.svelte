<script>
  export let label = "Click me";  // Default label if none is provided
  let text;
  
  function copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
</script>

<button 
  class='textarea-container text-1xl bg-secondary-light text-primary-darrk p-1 rounded-xl font-impact uppercase w-32 hover:bg-primary-light hover:text-primary-dark'
  on:click={copyToClipboard} texxtContent={text}
>
  {label}
</button>
