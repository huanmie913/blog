<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { getDate, getFromNow } from '../../utils'
import { goToLink } from '../utils';

const props = defineProps<{
  readTime?: string
  words?: string
  article?: object
}>()

const { frontmatter, page } = useData()

const Data = computed(() => {
  const date = props?.article?.date || frontmatter.value?.date || ''

  // 发布时间
  const publishedTime = getDate(date)

  // 更新时间
  const lastUpdated = page.value.lastUpdated 
  const timeFromNow =  getFromNow(lastUpdated || date) 

  // 分类
  const categories = props?.article?.categories || frontmatter.value?.categories || []

  // 标签
  const tags = props?.article?.tags || frontmatter.value?.tags || []

  return {
    publishedTime,
    timeFromNow,
    categories,
    tags,
  }
})
</script>

<template>
  <div>
    <section
      class="border-b-1 w-full mt-[24px] pb-[12px] flex gap-[12px] mb-[12px] flex-wrap max-w-[85%]"
    >
      <div v-if="Data.publishedTime" class="flex gap-[4px] items-center">
        <eos-icons:modified-date height="16" />
        发表于:<span>{{ Data.publishedTime }}</span>
      </div>

      <div class="flex gap-[4px] items-center" v-if="Data.timeFromNow">
        <radix-icons:update height="16" />
        更新于:<span>{{ Data.timeFromNow }}</span>
      </div>

      <div class="flex gap-[4px] items-center" v-if="words">
        <bi:file-earmark-word-fill  height="16" />
        字数:<span>{{ words }} 字</span>
      </div>

      <div class="flex gap-[4px] items-center" v-if="readTime">
        <fa6-solid:clock  height="16" />
        阅读:<span>{{ readTime }} 分钟</span>
      </div>
      
      <div class="flex gap-[4px] items-center" v-if="Data?.categories?.length">
        <fa6-solid:folder-open  height="16" />
        <span v-for="(category, index) in Data.categories" :key="index">
          <a href="javascript:void(0);" @click="goToLink('/archives', 'category', category)" target="_self" :title="category">{{ category }}</a>
          <span v-if="index != Data.categories.length - 1">, </span>
        </span>
      </div>

      <div class="flex gap-[4px] items-center" v-if="Data?.tags?.length">
        <fa6-solid:tags  height="16" />
        <span v-for="(tag, index) in Data.tags" :key="index">
          <a href="javascript:void(0);" @click="goToLink('/archives', 'tag', tag)" target="_self" :title="tag">{{ tag }}</a>
          <span v-if="index != Data.tags.length - 1">, </span>
        </span>
      </div>
    </section>
  </div>
</template>
