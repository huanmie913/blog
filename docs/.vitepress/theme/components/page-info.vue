<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { getDate, getFromNow } from '../../utils'

defineProps<{
  readTime: string
  words: string
}>()
// const defaultAuthor = 'feifei'
// const author = ref(defaultAuthor)
const { frontmatter, page } = useData()

const publishedTime = getDate(frontmatter.value?.date)

// if (frontmatter.value?.author)
//   author.value = frontmatter.value?.author
const lastUpdated = page.value.lastUpdated 
const lastUpdatedDate = computed(() => lastUpdated ? new Date(lastUpdated!) : new Date())
const isoDatetime = computed(() => lastUpdatedDate.value.toISOString())
const timeFormNow = getFromNow(isoDatetime.value)
</script>

<template>
  <div>
    <section
      class="border-b-1 w-full mt-[24px] pb-[12px] flex gap-[12px] mb-[12px] flex-wrap max-w-[85%]"
    >
      <!-- <div class="flex gap-[4px] items-center">
        <octicon:feed-person-16 />
        作者:<span>
          {{ author }}
        </span>
      </div> -->
      <div v-if="publishedTime" class="flex gap-[4px] items-center">
        <eos-icons:modified-date height="16" />
        发表于:<span>{{ publishedTime }}</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <radix-icons:update height="16" />
        更新于:<span>{{ timeFormNow }}</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <bi:file-earmark-word-fill  height="16" />
        字数:<span>{{ words }} 字</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <ooui:clock  height="16" />
        阅读:<span>{{ readTime }} 分钟</span>
      </div>
    </section>
  </div>
</template>
