<script>
	import '../app.css';
</script>

<div class="grid h-screen place-items-center bg-[url('/background.jpg')] bg-cover bg-center">
	<div class="h-[72%] w-3/4 overflow-hidden rounded bg-white drop-shadow-md">
		<slot />
	</div>
</div>
