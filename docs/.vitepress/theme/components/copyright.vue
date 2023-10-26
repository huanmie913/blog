<template>
    <div class="site-footer">
        MIT Licensed | Copyright © 2021-2023 <a class="vitepress" :href="website">{{ webTitle }}</a><br />
        Powered by <a class="vitepress" target="_blank" href="https://vitepress.dev/">VitePress</a>
    </div>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const website = theme.value.website
const webTitle = site.value.title
</script>

<style>
.site-footer {
    color: #888;
    text-align: center;
    font-size: 0.75rem;
    width: 100%;
    padding: 15px 0;
    overflow: auto;
}

.vitepress {
    /* vitepress default css */
    color: var(--vp-c-text-1); 
    font-weight: 700;
}

</style>
