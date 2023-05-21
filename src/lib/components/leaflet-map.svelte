<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;

    onMount(async () => {
        if (browser) {
            const L = await import('leaflet');
            map = L.map(mapElement).setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([51.5, -0.09]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
        }
    });

    onDestroy(async () => {
        if (map) map.remove();
    });
</script>

<div class="flex flex-col sm:flex-row w-[95%] sm:w-[600px] lg:w-[800px]">
    <div class="map h-[500px] w-full sm:w-[70%]" bind:this={mapElement}></div>
    <div class="w-full sm:w-[30%] h-[500px] bg-gray-100 sm:ml-1 p-3 flex flex-col">
        <input class="bg-brown-500 hover:bg-brown-600 w-full p-2.5 cursor-pointer mb-4" type="button" value="Report" />
        <input class="bg-brown-500 hover:bg-brown-600 w-full p-2.5 cursor-pointer mb-4" type="button" value="Check location" />
        <div class="overflow-y-auto flex-grow">
            <p>13:00 - Human reported at [5.3, 5].</p>
            <p>14:00 - Human reported at [5.3, 5].</p>
            <p>18:33 - Human reported at [5.3, 5].</p>
            <p>20:27 - Human reported at [5.3987, 10.234].</p>
            <p>18:33 - Human reported at [5.3, 5].</p>
            <p>20:27 - Human reported at [5.3987, 10.234].</p>
            <p>18:33 - Human reported at [5.3, 5].</p>
            <p>20:27 - Human reported at [5.3987, 10.234].</p>
            <p>18:33 - Human reported at [5.3, 5].</p>
            <p>20:27 - Human reported at [5.3987, 10.234].</p>
            <p>18:33 - Human reported at [5.3, 5].</p>
            <p>20:27 - Human reported at [5.3987, 10.234].</p>
        </div>
    </div>
</div>

<style>
    @import 'leaflet/dist/leaflet.css';
</style>