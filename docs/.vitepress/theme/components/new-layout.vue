<template>
    <Layout>
      <template #home-features-after>
        <ContentExamples />
      </template>

      <template #doc-before>
        <!-- doc-before -->
      </template>

      <template #doc-top>
        <!-- doc-top -->
      </template>

      <template #doc-footer-before>
        <!-- doc-footer-before -->
      </template>

      <template #doc-after>
        <!-- 评论插件 -->
        <comment />
      </template>

      <template #layout-bottom>
      <!-- layout-bottom -->
      </template>

    </Layout>

    <Copyright />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
// import Copyright from './copyright.vue'
const { Layout } = DefaultTheme
</script>
