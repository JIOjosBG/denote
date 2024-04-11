
<script lang="ts">
  	export let item: any = undefined;

    function download(file, text) {
 
    var element = document.createElement('a');
        element.setAttribute('href',
            'data:text/plain;charset=utf-8, '
            + encodeURIComponent(item.name+" wtafak"));
        element.setAttribute('download', `${item.name}.txt`);
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }
</script>
<div class="box">
    <!-- Content of the box goes here -->
    {item.name}
    {item.id}
    <a on:click={download}>Download</a>

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