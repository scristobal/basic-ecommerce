<script>
    import '../app.css';
</script>

<div class="grid h-screen place-items-center bg-[url('/images/background.jpg')] bg-cover bg-center">
    <main class="w-full min-w-[500px] max-w-[1088px] rounded bg-white drop-shadow-md lg:h-[72%] lg:w-3/4 lg:overflow-hidden">
        <slot />
    </main>
</div>
