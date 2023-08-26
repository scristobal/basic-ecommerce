<script lang="ts">
    import { goto } from '$app/navigation';

    import { onMount } from 'svelte';

    onMount(() => {
        setTimeout(() => {
            goto('/');
        }, 3000);
    });
</script>

<div class="grid h-full place-items-center">
    <p>
        <svg class="inline-block align-bottom" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            ><path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z" /></svg
        >
        Page not found, redirecting to store or click <a class="text-gray-400 underline" href="/">here</a> to go back.
    </p>
</div>
