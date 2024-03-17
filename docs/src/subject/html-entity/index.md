---
title: HTML实体字符/ISO Latin-1字符集
date: 2024-01-12
tags:
 - html
 - 实体
 - 特殊符号
categories:
 - 技术专题
 - 前端
---
# HTML实体字符/ISO Latin-1字符集

## 一、概述

实体是一种在HTML中编写特殊字符或符号的机制，例如数学符号、大多数语言中的字符和许多其他符号。可以使用下表中显示的三种格式指定实体。
这些字符通常以 `&` 开头，以 `;` 结尾。

| Format type | Format example | Symbol | Description                                                                  |
| ----------- | -------------- | ------ | ---------------------------------------------------------------------------- |
| 实体名称    | `&copy;`     | ©     | HTML定义了常见的已知实体的名称。实体名称通常是符号的英文名称的缩写。         |
| 十进制数    | `&#169;`     | ©     | 每个HTML实体都有一个唯一的数字，可以指定为十进制值。                         |
| 十六进制数  | `&#x000A9;`  | ©     | 每个HTML实体都有一个唯一的十六进制数，它是与实体的十进制数相等的十六进制数。 |

## 二、空格字符

HTML提供了5种空格实体（space entity），它们拥有不同的宽度，非断行空格（`&nbsp;`）是常规空格的宽度，可运行于所有主流浏览器。其他几种空格（ `&ensp; &emsp; &thinsp; &zwnj;&zwj;`）在不同浏览器中宽度各异。

`&nbsp;  `

它叫不换行空格，全称No-Break Space，它是最常见和我们使用最多的空格，大多数的人可能只接触了 ，它是按下space键产生的空格。在HTML中，如果你用空格键产生此空格，空格是不会累加的（只算1个，例如：您在文本中写 10 个空格，在显示该页面之前，浏览器会删除它们中的 9 个）。要使用html实体表示才可累加，该空格占据宽度受字体影响明显而强烈。浏览器总是会截短 HTML 页面中的空格。

`&ensp; `

它叫“半角空格”，全称是En Space，en是字体排印学的计量单位，为em宽度的一半。根据定义，它等同于字体度的一半（如16px字体中就是8px）。名义上是小写字母n的宽度。此空格传承空格家族一贯的特性：透明的，此空格有个相当稳健的特性，就是其占据的宽度正好是1/2个中文宽度，而且基本上不受字体影响。

`&emsp;`

它叫“全角空格”，全称是Em Space，em是字体排印学的计量单位，相当于当前指定的点数。例如，1 em在16px的字体中就是16px。此空格也传承空格家族一贯的特性：透明的，此空格也有个相当稳健的特性，就是其占据的宽度正好是1个中文宽度，而且基本上不受字体影响。

`&thinsp; `

它叫窄空格，全称是Thin Space。我们不妨称之为“瘦弱空格”，就是该空格长得比较瘦弱，身体单薄，占据的宽度比较小。它是em之六分之一宽。

`&zwnj; `

它叫零宽不连字，全称是Zero Width Non Joiner，简称“ZWNJ”，是一个不打印字符，放在电子文本的两个字符之间，抑制本来会发生的连字，而是以这两个字符原本的字形来绘制。Unicode中的零宽不连字字符映射为“”（zero width non-joiner，U+200C），HTML字符值引用为： `&#8204;`

`&zwj;`

它叫零宽连字，全称是Zero Width Joiner，简称“ZWJ”，是一个不打印字符，放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果。零宽连字符的Unicode码位是U+200D (HTML:` &#8205; &zwj;`）。

## 三、html中tab键的表示

HTML特殊字符不包括TAB（TAB应该可以用 `&#9;`表示. 但只有在 `<PRE>...</PRE>`这样的标记内部才起作用，其他地方只相当于一个空格）。

如果想模拟表示，可以使用 `&emsp;`这个。

HTML中 `&nbsp; &ensp; &emsp; &thinsp;`等6种空白空格的区别

HTML提供了5种空格实体（space entity），它们拥有不同的宽度，非断行空格（`&nbsp;`）是常规空格的宽度，可运行于所有主流浏览器。其他几种空格（ `&ensp; &emsp; &thinsp; &zwnj;&zwj;`）在不同浏览器中宽度各异。

`&nbsp; `

它叫不换行空格，全称No-Break Space，它是最常见和我们使用最多的空格，大多数的人可能只接触了 `&nbsp;`，它是按下space键产生的空格。在HTML中，如果你用空格键产生此空格，空格是不会累加的（只算1个）。要使用html实体表示才可累加，该空格占据宽度受字体影响明显而强烈。

`&ensp; `

它叫“半角空格”，全称是En Space，en是字体排印学的计量单位，为em宽度的一半。根据定义，它等同于字体度的一半（如16px字体中就是8px）。名义上是小写字母n的宽度。此空格传承空格家族一贯的特性：透明的，此空格有个相当稳健的特性，就是其占据的宽度正好是1/2个中文宽度，而且基本上不受字体影响。

`&emsp;  `

它叫“全角空格”，全称是Em Space，em是字体排印学的计量单位，相当于当前指定的点数。例如，1 em在16px的字体中就是16px。此空格也传承空格家族一贯的特性：透明的，此空格也有个相当稳健的特性，就是其占据的宽度正好是1个中文宽度，而且基本上不受字体影响。

`&thinsp;  `

它叫窄空格，全称是Thin Space。我们不妨称之为“瘦弱空格”，就是该空格长得比较瘦弱，身体单薄，占据的宽度比较小。它是em之六分之一宽。

`&zwnj;`

它叫零宽不连字，全称是Zero Width Non Joiner，简称“ZWNJ”，是一个不打印字符，放在电子文本的两个字符之间，抑制本来会发生的连字，而是以这两个字符原本的字形来绘制。Unicode中的零宽不连字字符映射为“”（zero width non-joiner，U+200C），HTML字符值引用为： `&#8204;`

`&zwj;`

它叫零宽连字，全称是Zero Width Joiner，简称“ZWJ”，是一个不打印字符，放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果。零宽连字符的Unicode码位是U+200D (HTML: `&#8205; &zwj;`）。

此外，浏览器还会把以下字符当作空白进行解析：空格（`&#x0020;`）、制表位（`&#x0009;`）、换行（`&#x000A;`）和回车（`&#x000D;`）还有（`&#12288;`）等等。

## 四、结合音标符

发音符号是加到字母上的一个"glyph(字形)"。一些变音符号, 如 尖音符 (  ̀) 和 抑音符 (  ́) 。变音符号可以出现字母的上面和下面，或者字母里面，或者两个字母间。

变音符号可以与字母、数字字符的组合来使用。

| 音标符 | 字符 | Construct    | 输出结果 |
| ------ | ---- | ------------ | -------- |
| ̀     | a    | `a&#768;`  | à      |
| ́     | a    | `a&#769;`  | á      |
| ̂     | a    | `a&#770;`  | â      |
| ̃     | a    | `a&#771;`  | ã      |
| ̀     | O    | `O&#768;`  | Ò      |
| ́     | O    | `O&#769;`  | Ó      |
| ̂     | O    | `O&#770; ` | Ô      |
| ̃     | O    | ` O&#771;` | Õ      |

作者：前端王祖蓝
链接：https://juejin.cn/post/6904905859852156936
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


## 五、常用实体字符列表

| **字符** | **十进制字符编号** | **实体名字**           | **说明**                     |
| -------------- | ------------------------ | ---------------------------- | ---------------------------------- |
| ---            | `&#00;`                | ---                          | 未使用Unused                       |
| ---            | `&#01;`                | ---                          | 未使用Unused                       |
| ---            | `&#02;`                | ---                          | 未使用Unused                       |
| ---            | `&#03;`                | ---                          | 未使用Unused                       |
| ---            | `&#04;`                | ---                          | 未使用Unused                       |
| ---            | `&#05;`                | ---                          | 未使用Unused                       |
| ---            | `&#06;`                | ---                          | 未使用Unused                       |
| ---            | `&#07;`                | ---                          | 未使用Unused                       |
| ---            | `&#08;`                | ---                          | 未使用Unused                       |
| ---            | `&#09;`                | ---                          | 制表符Horizontal tab               |
| ---            | `&#10;`                | ---                          | 换行Line feed                      |
| ---            | `&#11;`                | ---                          | 未使用Unused                       |
| ---            | `&#12;`                | ---                          | 未使用Unused                       |
| ---            | `&#13;`                | ---                          | 回车Carriage Return                |
| ---            | `&#14;`                | ---                          | 未使用Unused                       |
| ---            | `&#15;`                | ---                          | 未使用Unused                       |
| ---            | `&#16;`                | ---                          | 未使用Unused                       |
| ---            | `&#17;`                | ---                          | 未使用Unused                       |
| ---            | `&#18;`                | ---                          | 未使用Unused                       |
| ---            | `&#19;`                | ---                          | 未使用Unused                       |
| ---            | `&#20;`                | ---                          | 未使用Unused                       |
| ---            | `&#21;`                | ---                          | 未使用Unused                       |
| ---            | `&#22;`                | ---                          | 未使用Unused                       |
| ---            | `&#23;`                | ---                          | 未使用Unused                       |
| ---            | `&#24;`                | ---                          | 未使用Unused                       |
| ---            | `&#25;`                | ---                          | 未使用Unused                       |
| ---            | `&#26;`                | ---                          | 未使用Unused                       |
| ---            | `&#27;`                | ---                          | 未使用Unused                       |
| ---            | `&#28;`                | ---                          | 未使用Unused                       |
| ---            | `&#29;`                | ---                          | 未使用Unused                       |
| ---            | `&#30;`                | ---                          | 未使用Unused                       |
| ---            | `&#31;`                | ---                          | 未使用Unused                       |
|                | `&#32;`                | ---                          | Space                              |
| !              | `&#33;`                | ---                          | 惊叹号Exclamation mark             |
| "              | `&#34;`                | `&quot;`                   | 双引号Quotation mark               |
| #              | `&#35;`                | ---                          | 数字标志Number sign                |
| $              | `&#36;`                | ---                          | 美元标志Dollar sign                |
| %              | `&#37;`                | ---                          | 百分号Percent sign                 |
| &              | `&#38;`                | `&amp;`                    | Ampersand                          |
| '              | `&#39;`                | ---                          | 单引号Apostrophe                   |
| (              | `&#40;`                | ---                          | 小括号左边部分Left parenthesis     |
| )              | `&#41;`                | ---                          | 小括号右边部分Right parenthesis    |
| *              | `&#42;`                | ---                          | 星号Asterisk                       |
| +              | `&#43;`                | ---                          | 加号Plus sign                      |
| ,              | `&#44;`                | ---                          | 逗号Comma                          |
| -              | `&#45;`                | ---                          | 连字号Hyphen                       |
| .              | `&#46;`                | ---                          | 句号Period (fullstop)              |
| /              | `&#47;`                | ---                          | 斜杠Solidus (slash)                |
| 0              | `&#48;`                | ---                          | 数字0 Digit 0                      |
| 1              | `&#49;`                | ---                          | 数字1 Digit 1                      |
| 2              | `&#50;`                | ---                          | 数字2 Digit 2                      |
| 3              | `&#51;`                | ---                          | 数字3 Digit 3                      |
| 4              | `&#52;`                | ---                          | 数字4 Digit 4                      |
| 5              | `&#53;`                | ---                          | 数字5 Digit 5                      |
| 6              | `&#54;`                | ---                          | 数字6 Digit 6                      |
| 7              | `&#55;`                | ---                          | 数字7 Digit 7                      |
| 8              | `&#56;`                | ---                          | 数字8 Digit 8                      |
| 9              | `&#57;`                | ---                          | 数字9 Digit 9                      |
| :              | `&#58;`                | ---                          | 冒号Colon                          |
| ;              | `&#59;`                | ---                          | 分号Semicolon                      |
| <              | `&#60;`                | `&lt;`                     | 小于号Less than                    |
| =              | `&#61;`                | ---                          | 等于符号Equals sign                |
| >              | `&#62;`                | `&gt;`                     | 大于号Greater than                 |
| ?              | `&#63;`                | ---                          | 问号Question mark                  |
| @              | `&#64;`                | ---                          | Commercial at                      |
| A              | `&#65;`                | ---                          | 大写A Capital A                    |
| B              | `&#66;`                | ---                          | 大写B Capital B                    |
| C              | `&#67;`                | ---                          | 大写C Capital C                    |
| D              | `&#68;`                | ---                          | 大写D Capital D                    |
| E              | `&#69;`                | ---                          | 大写E Capital E                    |
| F              | `&#70;`                | ---                          | 大写F Capital F                    |
| G              | `&#71;`                | ---                          | 大写G Capital G                    |
| H              | `&#72;`                | ---                          | 大写H Capital H                    |
| I              | `&#73;`                | ---                          | 大写J Capital I                    |
| J              | `&#74;`                | ---                          | 大写K Capital J                    |
| K              | `&#75;`                | ---                          | 大写L Capital K                    |
| L              | `&#76;`                | ---                          | 大写K Capital L                    |
| M              | `&#77;`                | ---                          | 大写M Capital M                    |
| N              | `&#78;`                | ---                          | 大写N Capital N                    |
| O              | `&#79;`                | ---                          | 大写O Capital O                    |
| P              | `&#80;`                | ---                          | 大写P Capital P                    |
| Q              | `&#81;`                | ---                          | 大写Q Capital Q                    |
| R              | `&#82;`                | ---                          | 大写R Capital R                    |
| S              | `&#83;`                | ---                          | 大写S Capital S                    |
| T              | `&#84;`                | ---                          | 大写T Capital T                    |
| U              | `&#85;`                | ---                          | 大写U Capital U                    |
| V              | `&#86;`                | ---                          | 大写V Capital V                    |
| W              | `&#87;`                | ---                          | 大写W Capital W                    |
| X              | `&#88;`                | ---                          | 大写X Capital X                    |
| Y              | `&#89;`                | ---                          | 大写Y Capital Y                    |
| Z              | `&#90;`                | ---                          | 大写Z Capital Z                    |
| [              | `&#91;`                | ---                          | 中括号左边部分Left square bracket  |
| \\             | `&#92;`                | ---                          | 反斜杠Reverse solidus (backslash)  |
| ]              | `&#93;`                | ---                          | 中括号右边部分Right square bracket |
| ^              | `&#94;`                | ---                          | Caret                              |
| _              | `&#95;`                | ---                          | 下划线Horizontal bar (underscore)  |
| `              | `&#96;`                | ---                          | 尖重音符Acute accent               |
| a              | `&#97;`                | ---                          | 小写a Small a                      |
| b              | `&#98;`                | ---                          | 小写b Small b                      |
| c              | `&#99;`                | ---                          | 小写c Small c                      |
| d              | `&#100;`               | ---                          | 小写d Small d                      |
| e              | `&#101;`               | ---                          | 小写e Small e                      |
| f              | `&#102;`               | ---                          | 小写f Small f                      |
| g              | `&#103;`               | ---                          | 小写g Small g                      |
| h              | `&#104;`               | ---                          | 小写h Small h                      |
| i              | `&#105;`               | ---                          | 小写i Small i                      |
| j              | `&#106;`               | ---                          | 小写j Small j                      |
| k              | `&#107;`               | ---                          | 小写k Small k                      |
| l              | `&#108;`               | ---                          | 小写l Small l                      |
| m              | `&#109;`               | ---                          | 小写m Small m                      |
| n              | `&#110;`               | ---                          | 小写n Small n                      |
| o              | `&#111;`               | ---                          | 小写o Small o                      |
| p              | `&#112;`               | ---                          | 小写p Small p                      |
| q              | `&#113;`               | ---                          | 小写q Small q                      |
| r              | `&#114;`               | ---                          | 小写r Small r                      |
| s              | `&#115;`               | ---                          | 小写s Small s                      |
| t              | `&#116;`               | ---                          | 小写t Small t                      |
| u              | `&#117;`               | ---                          | 小写u Small u                      |
| v              | `&#118;`               | ---                          | 小写v Small v                      |
| w              | `&#119;`               | ---                          | 小写w Small w                      |
| x              | `&#120;`               | ---                          | 小写x Small x                      |
| y              | `&#121;`               | ---                          | 小写y Small y                      |
| z              | `&#122;`               | ---                          | 小写z Small z                      |
| {              | `&#123;`               | ---                          | 大括号左边部分Left curly brace     |
| &#124;         | `&#124;`               | ---                          | 竖线Vertical bar                   |
| }              | `&#125;`               | ---                          | 大括号右边部分Right curly brace    |
| ~              | `&#126;`               | ---                          | Tilde                              |
| ---            | `&#127;`               | ---                          | 未使用Unused                       |
| &#160;         | `&#160`                | `&nbsp;`                   | 不间断空格 Nonbreaking space       |
| &ensp;         | `&ensp;`               | `&ensp;`                   | 半角空格                           |
| &emsp;         | `&emsp;`               | `&emsp;`                   | 全角空格                           |
| ¡             | `&#161;`               | `&iexcl;`                  | Inverted exclamation               |
| ¢             | `&#162;`               | `&cent;`                   | 货币分标志Cent sign                |
| £             | `&#163;`               | `&pound;`                  | 英镑标志Pound sterling             |
| ¤             | `&#164;`               | `&curren;`                 | 通用货币标志General currency sign  |
| ¥             | `&#165;`               | `&yen;`                    | 日元标志Yen sign                   |
| ¦             | `&#166;`               | `&brvbar;` or `&brkbar;` | 断竖线Broken vertical bar          |
| §             | `&#167;`               | `&sect;`                   | 分节号Section sign                 |
| ¨             | `&#168;`               | `&uml;` or `&die;`       | 变音符号Umlaut                     |
| ©             | `&#169;`               | `&copy;`                   | 版权标志Copyright                  |
| ª             | `&#170;`               | `&ordf;`                   | Feminine ordinal                   |
| «             | `&#171;`               | `&laquo;`                  | Left angle quote, guillemet left   |
| ¬             | `&#172;`               | `&not;`                    | Not sign                           |
| ­             | `&#173;`               | `&shy;`                    | Soft hyphen                        |
| ®             | `&#174;`               | `&reg;`                    | 注册商标标志Registered trademark   |
| ¯             | `&#175;`               | `&macr;` or `&hibar;`    | 长音符号Macron accent              |
| °             | `&#176;`               | `&deg;`                    | 度数标志Degree sign                |
| ±             | `&#177;`               | `&plusmn;`                 | 加或减Plus or minus                |
| ²             | `&#178;`               | `&sup2;`                   | 上标2 Superscript two              |
| ³             | `&#179;`               | `&sup3;`                   | 上标3 Superscript three            |
| ´             | `&#180;`               | `&acute;`                  | 尖重音符Acute accent               |
| µ             | `&#181;`               | `&micro;`                  | Micro sign                         |
| ¶             | `&#182;`               | `&para;`                   | Paragraph sign                     |
| ·             | `&#183;`               | `&middot;`                 | Middle dot                         |
| ¸             | `&#184;`               | `&cedil;`                  | Cedilla                            |
| ¹             | `&#185;`               | `&sup1;`                   | 上标1 Superscript one              |
| º             | `&#186;`               | `&ordm;`                   | Masculine ordinal                  |
| »             | `&#187;`               | `&raquo;`                  | Right angle quote, guillemet right |
| ¼             | `&#188;`               | `&frac14;`                 | 四分之一Fraction one-fourth        |
| ½             | `&#189;`               | `&frac12;`                 | 二分之一Fraction one-half          |
| ¾             | `&#190;`               | `&frac34;`                 | 四分之三Fraction three-fourths     |
| ¿             | `&#191;`               | `&iquest;`                 | Inverted question mark             |
| À             | `&#192;`               | `&Agrave;`                 | Capital A, grave accent            |
| Á             | `&#193;`               | `&Aacute;`                 | Capital A, acute accent            |
| Â             | `&#194;`               | `&Acirc;`                  | Capital A, circumflex              |
| Ã             | `&#195;`               | `&Atilde;`                 | Capital A, tilde                   |
| Ä             | `&#196;`               | `&Auml;`                   | Capital A, di?esis / umlaut        |
| Å             | `&#197;`               | `&Aring;`                  | Capital A, ring                    |
| Æ             | `&#198;`               | `&AElig;`                  | Capital AE ligature                |
| Ç             | `&#199;`               | `&Ccedil;`                 | Capital C, cedilla                 |
| È             | `&#200;`               | `&Egrave;`                 | Capital E, grave accent            |
| É             | `&#201;`               | `&Eacute;`                 | Capital E, acute accent            |
| Ê             | `&#202;`               | `&Ecirc;`                  | Capital E, circumflex              |
| Ë             | `&#203;`               | `&Euml;`                   | Capital E, di?esis / umlaut        |
| Ì             | `&#204;`               | `&Igrave;`                 | Capital I,grave accent             |
| Í             | `&#205;`               | `&Iacute;`                 | Capital I,acute accent             |
| Î             | `&#206;`               | `&Icirc;`                  | Capital I, circumflex              |
| Ï             | `&#207;`               | `&Iuml;`                   | Capital I, di?esis / umlaut        |
| Ð             | `&#208;`               | `&ETH;`                    | Capital Eth, Icelandic             |
| Ñ             | `&#209;`               | `&Ntilde;`                 | Capital N, tilde                   |
| Ò             | `&#210;`               | `&Ograve;`                 | Capital O, grave accent            |
| Ó             | `&#211;`               | `&Oacute;`                 | Capital O, acute accent            |
| Ô             | `&#212;`               | `&Ocirc;`                  | Capital O, circumflex              |
| Õ             | `&#213;`               | `&Otilde;`                 | Capital O, tilde                   |
| Ö             | `&#214;`               | `&Ouml;`                   | Capital O, di?esis / umlaut        |
| ×             | `&#215;`               | `&times;`                  | 乘号Multiply sign                  |
| Ø             | `&#216;`               | `&Oslash;`                 | Capital O, slash                   |
| Ù             | `&#217;`               | `&Ugrave;`                 | Capital U, grave accent            |
| Ú             | `&#218;`               | `&Uacute;`                 | Capital U, acute accent            |
| Û             | `&#219;`               | `&Ucirc;`                  | Capital U, circumflex              |
| Ü             | `&#220;`               | `&Uuml;`                   | Capital U, di?esis / umlaut        |
| Ý             | `&#221;`               | `&Yacute;`                 | Capital Y, acute accent            |
| Þ             | `&#222;`               | `&THORN;`                  | Capital Thorn, Icelandic           |
| ß             | `&#223;`               | `&szlig;`                  | Small sharp s, German sz           |
| à             | `&#224;`               | `&agrave;`                 | Small a, grave accent              |
| á             | `&#225;`               | `&aacute;`                 | Small a, acute accent              |
| â             | `&#226;`               | `&acirc;`                  | Small a, circumflex                |
| ã             | `&#227;`               | `&atilde;`                 | Small a, tilde                     |
| ä             | `&#228;`               | `&auml;`                   | Small a, di?esis / umlaut          |
| å             | `&#229;`               | `&aring;`                  | Small a, ring                      |
| æ             | `&#230;`               | `&aelig;`                  | Small ae ligature                  |
| ç             | `&#231;`               | `&ccedil;`                 | Small c, cedilla                   |
| è             | `&#232;`               | `&egrave;`                 | Small e, grave accent              |
| é             | `&#233;`               | `&eacute;`                 | Small e, acute accent              |
| ê             | `&#234;`               | `&ecirc;`                  | Small e, circumflex                |
| ë             | `&#235;`               | `&euml;`                   | Small e, di?esis / umlaut          |
| ì             | `&#236;`               | `&igrave;`                 | Small i, grave accent              |
| í             | `&#237;`               | `&iacute;`                 | Small i, acute accent              |
| î             | `&#238;`               | `&icirc;`                  | Small i, circumflex                |
| ï             | `&#239;`               | `&iuml;`                   | Small i, di?esis / umlaut          |
| ð             | `&#240;`               | `&eth;`                    | Small eth, Icelandic               |
| ñ             | `&#241;`               | `&ntilde;`                 | Small n, tilde                     |
| ò             | `&#242;`               | `&ograve;`                 | Small o, grave accent              |
| ó             | `&#243;`               | `&oacute;`                 | Small o, acute accent              |
| ô             | `&#244;`               | `&ocirc;`                  | Small o, circumflex                |
| õ             | `&#245;`               | `&otilde;`                 | Small o, tilde                     |
| ö             | `&#246;`               | `&ouml;`                   | Small o, di?esis / umlaut          |
| ÷             | `&#247;`               | `&divide;`                 | 除号Division sign                  |
| ø             | `&#248;`               | `&oslash;`                 | Small o, slash                     |
| ù             | `&#249;`               | `&ugrave;`                 | Small u, grave accent              |
| ú             | `&#250;`               | `&uacute;`                 | Small u, acute accent              |
| û             | `&#251;`               | `&ucirc;`                  | Small u, circumflex                |
| ü             | `&#252;`               | `&uuml;`                   | Small u, di?esis / umlaut          |
| ý             | `&#253;`               | `&yacute;`                 | Small y, acute accent              |
| þ             | `&#254;`               | `&thorn;`                  | Small thorn, Icelandic             |
| ÿ             | `&#255;`               | `&yuml;`                   | Small y, umlaut                    |
| Α             | `&Alpha;`              | `&#913;`                   | alpha                              |
| Β             | `&Beta;`               | `&#914;`                   | beta                               |
| Γ             | `&Gamma;`              | `&#915;`                   | gamma                              |
| Δ             | `&Delta;`              | `&#916;`                   | delta                              |
| Ε             | `&Epsilon;`            | `&#917;`                   | epsilon                            |
| Ζ             | `&Zeta;`               | `&#918;`                   | zeta                               |
| Η             | `&Eta;`                | `&#919;`                   | eta                                |
| Θ             | `&Theta;`              | `&#920;`                   | theta                              |
| Ι             | `&Iota;`               | `&#921;`                   | iota                               |
| Κ             | `&Kappa;`              | `&#922;`                   | kappa                              |
| Λ             | `&Lambda;`             | `&#923;`                   | lambda                             |
| Μ             | `&Mu;`                 | `&#924;`                   | mu                                 |
| Ν             | `&Nu;`                 | `&#925;`                   | nu                                 |
| Ξ             | `&Xi;`                 | `&#926;`                   | xi                                 |
| Ο             | `&Omicron;`            | `&#927;`                   | omicron                            |
| Π             | `&Pi;`                 | `&#928;`                   | pi                                 |
| Ρ             | `&Rho;`                | `&#929;`                   | rho                                |
| Σ             | `&Sigma;`              | `&#931;`                   | sigma                              |
| Τ             | `&Tau;`                | `&#932;`                   | tau                                |
| Υ             | `&Upsilon;`            | `&#933;`                   | upsilon                            |
| Φ             | `&Phi;`                | `&#934;`                   | phi                                |
| Χ             | `&Chi;`                | `&#935;`                   | chi                                |
| Ψ             | `&Psi;`                | `&#936;`                   | psi                                |
| Ω             | `&Omega;`              | `&#937;`                   | omega                              |
| α             | `&alpha;`              | `&#945;`                   | alpha                              |
| β             | `&beta;`               | `&#946;`                   | beta                               |
| γ             | `&gamma;`              | `&#947;`                   | gamma                              |
| δ             | `&delta;`              | `&#948;`                   | delta                              |
| ε             | `&epsilon;`            | `&#949;`                   | epsilon                            |
| ζ             | `&zeta;`               | `&#950;`                   | zeta                               |
| η             | `&eta;`                | `&#951;`                   | eta                                |
| θ             | `&theta;`              | `&#952;`                   | theta                              |
| ι             | `&iota;`               | `&#953;`                   | iota                               |
| κ             | `&kappa;`              | `&#954;`                   | kappa                              |
| λ             | `&lambda;`             | `&#955;`                   | lambda                             |
| μ             | `&mu;`                 | `&#956;`                   | mu                                 |
| ν             | `&nu;`                 | `&#957;`                   | nu                                 |
| ξ             | `&xi;`                 | `&#958;`                   | xi                                 |
| ο             | `&omicron;`            | `&#959;`                   | omicron                            |
| π             | `&pi;`                 | `&#960;`                   | pi                                 |
| ρ             | `&rho;`                | `&#961;`                   | rho                                |
| ς             | `&sigmaf;`             | `&#962;`                   | sigmaf                             |
| σ             | `&sigma;`              | `&#963;`                   | sigma                              |
| τ             | `&tau;`                | `&#964;`                   | tau                                |
| υ             | `&upsilon;`            | `&#965;`                   | upsilon                            |
| φ             | `&phi;`                | `&#966;`                   | phi                                |
| χ             | `&chi;`                | `&#967;`                   | chi                                |
| ψ             | `&psi;`                | `&#968;`                   | psi                                |
| ω             | `&omega;`              | `&#969;`                   | omega                              |
| ϑ             | `&thetasym;`           | `&#977;`                   | thetasym                           |
| ϒ             | `&upsih;`              | `&#978;`                   | upsih                              |
| ϖ             | `&piv;`                | `&#982;`                   | piv                                |
| •             | `&bull;`               | `&#8226;`                  | bull                               |
| …             | `&hellip;`             | `&#8230;`                  | hellip                             |
| ′             | `&prime;`              | `&#8242;`                  | prime                              |
| ″             | `&Prime;`              | `&#8243;`                  | Prime                              |
| ‾             | `&oline;`              | `&#8254;`                  | oline                              |
| ⁄             | `&frasl;`              | `&#8260;`                  | frasl                              |
| ℘             | `&weierp;`             | `&#8472;`                  | weierp                             |
| ℑ             | `&image;`              | `&#8465;`                  | image                              |
| ℜ             | `&real;`               | `&#8476;`                  | real                               |
| ™             | `&trade;`              | `&#8482;`                  | trade                              |
| ℵ             | `&alefsym;`            | `&#8501;`                  | alefsym                            |
| ←             | `&larr;`               | `&#8592;`                  | larr                               |
| ↑             | `&uarr;`               | `&#8593;`                  | uarr                               |
| →             | `&rarr;`               | `&#8594;`                  | rarr                               |
| ↓             | `&darr;`               | `&#8595;`                  | darr                               |
| ↔             | `&harr;`               | `&#8596;`                  | harr                               |
| ↵             | `&crarr;`              | `&#8629;`                  | crarr                              |
| ⇐             | `&lArr;`               | `&#8656;`                  | lArr                               |
| ⇑             | `&uArr;`               | `&#8657;`                  | uArr                               |
| ⇒             | `&rArr;`               | `&#8658;`                  | rArr                               |
| ⇓             | `&dArr;`               | `&#8659;`                  | dArr                               |
| ⇔             | `&hArr;`               | `&#8660;`                  | hArr                               |
| ∀             | `&forall;`             | `&#8704;`                  | forall                             |
| ∂             | `&part;`               | `&#8706;`                  | part                               |
| ∃             | `&exist;`              | `&#8707;`                  | exist                              |
| ∅             | `&empty;`              | `&#8709;`                  | empty                              |
| ∇             | `&nabla;`              | `&#8711;`                  | nabla                              |
| ∈             | `&isin;`               | `&#8712;`                  | isin                               |
| ∉             | `&notin;`              | `&#8713;`                  | notin                              |
| ∋             | `&ni;`                 | `&#8715;`                  | ni                                 |
| ∏             | `&prod;`               | `&#8719;`                  | prod                               |
| ∑             | `&sum;`                | `&#8721;`                  | 求和 sum                           |
| −             | `&minus;`              | `&#8722;`                  | 减号 minus                         |
| ∗             | `&lowast;`             | `&#8727;`                  | lowast                             |
| √             | `&radic;`              | `&#8730;`                  | radic                              |
| ∝             | `&prop;`               | `&#8733;`                  | prop                               |
| ∞             | `&infin;`              | `&#8734;`                  | infin                              |
| ∠             | `&ang;`                | `&#8736;`                  | ang                                |
| ∧             | `&and;`                | `&#8743;`                  | and                                |
| ∨             | `&or;`                 | `&#8744;`                  | or                                 |
| ∩             | `&cap;`                | `&#8745;`                  | cap                                |
| ∪             | `&cup;`                | `&#8746;`                  | cup                                |
| ∫             | `&int;`                | `&#8747;`                  | int                                |
| ∴             | `&there4;`             | `&#8756;`                  | there4                             |
| ∼             | `&sim;`                | `&#8764;`                  | sim                                |
| ≅             | `&cong;`               | `&#8773;`                  | cong                               |
| ≈             | `&asymp;`              | `&#8776;`                  | asymp                              |
| ≠             | `&ne;`                 | `&#8800;`                  | ne                                 |
| ≡             | `&equiv;`              | `&#8801;`                  | equiv                              |
| ≤             | `&le;`                 | `&#8804;`                  | 小于等于 le                        |
| ≥             | `&ge;`                 | `&#8805;`                  | 大于等于 ge                        |
| ⊂             | `&sub;`                | `&#8834;`                  | sub                                |
| ⊃             | `&sup;`                | `&#8835;`                  | sup                                |
| ⊄             | `&nsub;`               | `&#8836;`                  | nsub                               |
| ⊆             | `&sube;`               | `&#8838;`                  | sube                               |
| ⊇             | `&supe;`               | `&#8839;`                  | supe                               |
| ⊕             | `&oplus;`              | `&#8853;`                  | oplus                              |
| ⊗             | `&otimes;`             | `&#8855;`                  | otimes                             |
| ⊥             | `&perp;`               | `&#8869;`                  | perp                               |
| ⋅             | `&sdot;`               | `&#8901;`                  | sdot                               |
| ⌈             | `&lceil;`              | `&#8968;`                  | lceil                              |
| ⌉             | `&rceil;`              | `&#8969;`                  | rceil                              |
| ⌊             | `&lfloor;`             | `&#8970;`                  | lfloor                             |
| ⌋             | `&rfloor;`             | `&#8971;`                  | rfloor                             |
| ◊             | `&loz;`                | `&#9674;`                  | loz                                |
| ♠             | `&spades;`             | `&#9824;`                  | 桃 spades                          |
| ♣             | `&clubs;`              | `&#9827;`                  | 梅花 clubs                         |
| ♥             | `&hearts;`             | `&#9829;`                  | 心 hearts                          |
| ♦             | `&diams;`              | `&#9830;`                  | 方块 diams                         |


## 六、参考资料

- 十六进制字符表：[https://html.spec.whatwg.org/multipage/named-characters.html]()
- HTML Entity List：[https://www.freeformatter.com/html-entities.html#math-symbols]()
- HTML Currency Symbols, Currency Entities and ASCII Currency Character Code Reference: [https://www.toptal.com/designers/htmlarrows/symbols/]()
- html-entities：[https://symbl.cc/en/html-entities/]()
- XML 和 HTML 字符实体引用列表(维基百科)：[https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references]()
- Character Entities for HTML, CSS and Javascript：[https://oinam.github.io/entities/]()
- HTML实体字符：h[ttps://juejin.cn/post/6904905859852156936]()
