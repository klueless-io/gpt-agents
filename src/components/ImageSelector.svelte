<script>
  export let mjImage;
  export let d3Image;
  export let top = 0; /* Default to 0 if not provided */
  export let left = 0; /* Default to 0 if not provided */
  
  function handleMouseOver() {
    document.getElementById('mj-image').style.backgroundImage = `url('${mjImage}')`;
    document.getElementById('d3-image').style.backgroundImage = `url('${d3Image}')`;
  }
</script>

<style>
  .ImageSelector {
    position: absolute; /* Make this element positioned */
    width: 80px;
    height: 50px;
  }
</style>

<selection>
<selection>
<div class="ImageSelector  bg-primary-dark border-primary-dark hover:bg-secondary-dark border-10 rounded-2xl rounded-b-none" on:mouseover={handleMouseOver}
     data-mj-image={mjImage} data-d3-image={d3Image}
     style="top: {top}px; left: {left}px;">
</div>

</selection>
</selection>
