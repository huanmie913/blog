import fs from 'node:fs';
import path from 'node:path';
import parseFrontmatter from 'gray-matter';

const excludedFiles = ['tags.md', 'archives.md', 'me.md'];
const excludedPaths = ['/index.md'];

function getFilePathName(file) {
  return file.substring(file.lastIndexOf('/docs/src') + 9);
}

export default {
  watch: ['./docs/**/*.md'],
  load(watchedFiles) {
    // 排除不必要文件
    const articleFiles = watchedFiles.filter(file => {
      const filename = path.basename(file);
      return !(excludedFiles.includes(filename) || excludedPaths.includes(getFilePathName(file)));
    });
    // 解析文章 Frontmatter
    return articleFiles.map(articleFile => {
      const articleContent = fs.readFileSync(articleFile, 'utf-8');
      const { data } = parseFrontmatter(articleContent);
      return {
        ...data,
        path: getFilePathName(articleFile).replace(/\.md$/, ''),
      }
    })
  }
}