
<script lang="ts">

  	export let item: any = undefined;
    export let orchestrator: any;
    export let isDownloading = false;

    async function download() {
        isDownloading = true;
        let host = process.env.DFX_NETWORK === "ic"
		? "https://icp-api.io"
		: "http://localhost:4943"
        const datasetToDownload  = await orchestrator.downloadDataset(item.db, item.id)
        const blob = new Blob([datasetToDownload]);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = item.datasheet.title;
        document.body.appendChild(a);
        a.click();
        isDownloading = false

    }
</script>
<div class="box">
    <h4>
        
        <!-- @TODO: add other sheet fields -->
        {item.datasheet.title}
        {#if !isDownloading}
        <a on:click={download}>Download</a>
        {:else}
        <p>loading...</p>
        {/if}
    </h4>
    <br>
    <h6>By {item.datasheet.creator}</h6>

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