
<script lang="ts">
  	export let item: any = undefined;
</script>
<div class="box">
    <!-- Content of the box goes here -->
    {item.name}
    {item.id}
</div>


<style lang="scss">
  .box {
    width: 90%;
    padding: 1rem;
    margin: 1rem;
    // border: {borderWidth} solid {borderColor}; 
    border-style: solid;// Border properties
    border-radius: 3px;
    border-color: black;
    }
</style>