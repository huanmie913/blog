<script setup lang="ts">
/*** 
 * 首页.默认推荐的学习资源
 */

import { examples } from "../../config/recommend-data";
</script>

<template>
  <div class="content">
    <div class="content-container">
      <div class="vp-doc" flex flex-col items-center mt-10  
      v-for="child of examples"
      :key="child.title"
      >
        <h2 id="meet-the-team" op70 font-normal p="t-10 b-2">{{ child.title }}</h2>
        <div class="container">
          <div flex="~ wrap gap-2 justify-center">
            <div
              v-for="item of child.children"
              :key="item.name"
              class="Link"
              w-80
              h-20
              text-center
              text-inherit
              flex="~ items-center justify-center gap-4"
            >
            <!-- icon -->
              <div v-if="item.icon" :class="item.icon" w-8 h-8 flex-none >
                <img v-if="item.icon=='inject'" :src="`/icons/${item.logo || item.name+'.png'}`" />
              </div>
              <div
                v-else-if="item.icons"
                w-8
                h-14
                flex-none
                flex="~ wrap items-center justify-center"
              >
                <div v-for="icon of item.icons" :key="icon" :class="icon" w-5 h-5 />
              </div>
              <div flex="~ col" w-50 text-left>
                <span text-sm font-500 text-truncate>{{ item.name }}</span>
                <span pt1 text-xs color-gray>{{ item.desc }}</span>
                <div py1 text-lg flex="~ gap-3">
                  <a
                    class="text-inherit! op50 hover:op100"
                    flex="~ items-center gap-0.5"
                    :href="`${link.url}`"
                    target="_blank"
                    v-for="link of item.links"
                  >
                    <!-- <div i-carbon-logo-github /> -->
                    <div :class="link.icon || 'i-gg-link'" />
                    <span text-xs>{{ link.channel || '官网' }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Link {
  color: inherit !important;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}
</style>
