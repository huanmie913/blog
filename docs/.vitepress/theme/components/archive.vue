<template>
  <div class="timeline-wrap">
    <!-- 时间轴头部 -->
    <div class="timeline-header">
      <div v-if="$category" class="content" closable @close="goToLink('/archives')">
        <fxemoji:documenttextpicture />
        {{ $category }} (共 {{ $articleData.length }} 篇)
      </div>
      <div v-else-if="$tag" class="content" closable @close="goToLink('/archives')">
        <fxemoji:documenttextpicture />
        {{ $tag }} (共 {{ $articleData.length }} 篇)
      </div>
      <div v-else-if="$year" class="content" closable @close="goToLink('/archives')">
        <fxemoji:documenttextpicture />
        {{ $year }}年 (共 {{ $articleData.length }} 篇)
      </div>
      <div v-else class="content">
        <fxemoji:documenttextpicture />
        共 {{ articleData.length }} 篇
      </div>
    </div>

    <!-- 时间轴主体 -->
    <div class="timeline-item" v-for="(item, year) in archiveData">
      <div class="year">
        <img
          class="chinese-zodiac"
          @click="goToLink('/archives', 'year', year.replace('年', ''))"
          :src="
            '/svg/chinese-zodiac/' + getChineseZodiac(year.replace('年', '')) + '.svg'
          "
          :title="getChineseZodiacAlias(year.replace('年', ''))"
          alt="生肖"
        />
        <span>{{ year }}</span>
      </div>

      <div class="timeline-item-content">
        <div v-for="(articles, month) in item">
          <span class="month">
            {{ month }}
          </span>
          <div class="articles">
            <div v-for="article in articles" class="article">
              <devicon:chrome
                v-if="article?.categories?.includes('前端技术')"
                @click="goToLink('/archives', 'category', article.categories[0])"
              />

              <entypo:light-bulb
                v-else-if="article?.categories?.includes('运维&网络')"
                @click="goToLink('/archives', 'category', article.categories[0])"
                style="color: #ff7d00"
              />

              <clarity:code-line
                v-else-if="article?.categories?.includes('技术专题')"
                @click="goToLink('/archives', 'category', article.categories[0])"
                style="color: #165dff"
              />

              <ep:document
                v-else
                @click="goToLink('/archives', 'category', article.categories[0])"
                style="color: #00b42a"
              />

              <a :href="article.path" class="title" target="_blank">{{
                article.title
              }}</a>
              <br />
              <PageInfo :article="article" />
            </div>
          </div>
        </div>
      </div>
      <div id="main"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  getQueryParam,
  goToLink,
  getChineseZodiac,
  getChineseZodiacAlias,
} from "../utils.ts";
import { data as articleData } from "../../../../article.data.js";

// 文章原始数据和归档数据
let $articleData;
let archiveData;

// 要筛选的分类、标签、年份
let $category;
let $tag;
let $year;

/**
 * 初始化时间轴
 */
function initTimeline() {
  $articleData = [];
  archiveData = {};

  // 如果URL路径有category或tag或year参数, 默认筛选出指定category或tag或year的文章数据
  // 例如: /archives?category=Bug万象集
  // 例如: /archives?tag=JVM
  // 例如: /archives?year=2020
  $category = getQueryParam("category");
  $tag = getQueryParam("tag");
  $year = getQueryParam("year");
  if ($category && $category.trim() != "") {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i];
      if (article.categories && article.categories.includes($category)) {
        $articleData.push(article);
      }
    }
  } else if ($tag && $tag.trim() != "") {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i];
      if (article.tags && article.tags.includes($tag)) {
        $articleData.push(article);
      }
    }
  } else if ($year && $year.trim() != "") {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i];
      if (article.date && new Date(article.date).getFullYear() == $year) {
        $articleData.push(article);
      }
    }
  } else {
    $articleData.push(...articleData);
  }

  // 文章数据归档处理
  // 1.对文章数据进行降序排序
  $articleData.sort((a, b) => b?.date?.localeCompare(a.date) || 0);
  // 2.按年、月进行归档
  for (let i = 0; i < $articleData.length; i++) {
    const article = $articleData[i];

    // 过滤掉没有date属性的文章
    if (!article.date) {
      console.warn('文章缺少date属性, 请检查: ', article)
      continue
    }

    let year = new Date(article.date).getFullYear() + "年";
    let month = new Date(article.date).getMonth() + 1 + "月";

    if (!archiveData[year]) {
      archiveData[year] = {};
    }
    if (!archiveData[year][month]) {
      archiveData[year][month] = [];
    }

    archiveData[year][month].push(article);
  }
}


initTimeline();

console.log('archiveData', archiveData)
</script>

<style scoped>
:deep(.arco-tag) {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
:deep(.arco-icon) {
  width: 1em;
  height: 1em;
}

.timeline-wrap {
  margin-top: 18px;
  word-break: break-all;
}

.timeline-wrap .timeline-header {
  padding-bottom: 20px;
}

.timeline-wrap .timeline-header .icon {
  fill: var(--vp-c-text-2);
  height: 22px;
  width: 22px;
}

.timeline-wrap .timeline-header .content {
  position: relative;
  left: -17px;
  font-size: 16px;
}

.timeline-wrap .timeline-item {
  padding: 0 0 0 20px;
  border-left: 1px solid #5d9df0;
  line-height: 1;
  position: relative;
}

.timeline-wrap .timeline-item:not(:last-child) {
  padding-bottom: 20px;
}

.timeline-wrap .timeline-item .year {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.6em;
}

.timeline-wrap .timeline-item .timeline-item-time {
  margin-bottom: 12px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-wrap .timeline-item .month {
  padding: 8px 0 8px 0;
  display: block;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.timeline-wrap .timeline-item .timeline-item-content {
  font-size: 14px;
}

.timeline-wrap .timeline-item .articles {
  line-height: 1;
  padding-top: 7px;
}

.timeline-wrap .timeline-item .articles .article {
  display: block;
  position: relative;
  margin-bottom: 20px;
  line-height: 1.5;
}

.timeline-wrap .timeline-item .articles svg {
  position: absolute;
  left: -27.5px;
  top: 3.5px;
  background: #fff;
  border: 1px solid #84b9e5;
  border-radius: 50%;
  cursor: pointer;
}

.timeline-wrap .timeline-item .articles .article span {
  color: var(--vp-c-text-2);
}

.vp-doc a {
  font-weight: 400;
  color: var(--vp-c-text-1);
}
.vp-doc a:hover {
  color: var(--vp-c-brand);
}
</style>
