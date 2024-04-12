
<script lang="ts">

  	export let item: any = undefined;
    export let orchestrator: any;
    export let isDownloading = false;

    async function downloadDataset() {
        isDownloading = true;
        let host = process.env.DFX_NETWORK === "ic"
		? "https://icp-api.io"
		: "http://localhost:4943"
        const datasetToDownload  = await orchestrator.downloadDataset(item.db, item.id)
        const blob = new Blob([datasetToDownload]);
        
        // --------
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = item.datasheet.title;
        document.body.appendChild(a);
        a.click();
        isDownloading = false
    }
    async function downloadDatasheet(){
                // ---------
                const url = URL.createObjectURL(new Blob([JSON.stringify(item,(key, value) => {
                // Check if the value is a BigInt
                if (typeof value === 'bigint') {
                    // Convert BigInt to string
                    return value.toString();
                }
                // Return the value as is for other types
                return value;
                })]));
                const a = document.createElement("a");
                a.href = url;
                a.download = item.datasheet.title+'.json';
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
        <br>
        <a on:click={downloadDataset}>Dataset</a>
        <a on:click={downloadDatasheet}>Datasheet</a>
        {:else}
        <p>loading...</p>
        {/if}
    </h4>
    <br>
    <h5>By {item.datasheet.creator}</h5>

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