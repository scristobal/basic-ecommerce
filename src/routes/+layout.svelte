<script>
    import '../app.css';
</script>

<div class="grid h-screen place-items-center bg-[url('/images/background.jpg')] bg-cover bg-center">
    <main class="h-full w-full overflow-hidden rounded bg-white drop-shadow-md lg:h-[72%] lg:min-h-[480px] lg:w-3/4 lg:max-w-[950px]">
        <slot />
    </main>
</div>
