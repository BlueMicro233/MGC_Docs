# 资源包 基本概念

::: tip 已重写的文档
这篇文档在最近进行过订正，可以放心阅读。  

2024 年 1 月 20 日
:::

::: warning 插件提示
此页面使用了 LaTeX 公式，第一次进入该页面时公式可能不会正确渲染。  
你应该看到下方有一行类似 **y=ax<sup>2</sup>+b** 的公式：

$$ y = ax^2+b $$

若你看到的是以 `$$` 开头的代码，请刷新页面，或点击 <button onclick="location.reload()">此处刷新</button> 。
:::

## 写在前面

### 资源包、纹理包和材质包的称谓区别


##### *纹理包*

*Texture Pack*，是 *JE 1.6.1* 以前所使用的用于自定义游戏**纹理**的文件包的**正确译名**。

##### *材质包*

Texture Pack 的**错误译名**。

  - 在英文语境中，**材质**所对应的英文单词为 *Material* ，在图形学中这用于描述物体的属性，如金属性、光滑度、自发光强度等。
  - 而**纹理**所对应的英文单词 *Texture* ，这才是用于描述物体表面颜色的单词。

##### *资源包*

*Resource Pack*，是 *JE 1.6.1* 及以后使用的用于自定义游戏的**纹理**、**声音**、**模型**，乃至**渲染**的文件包。

截至 *JE 1.6* 纹理包被资源包所替代时，这个译名在游戏内仍旧没有修改，于是此翻译便流传了下来，并**逐渐波及相关领域**，现在 [Minecraft 中文 Wiki](https://zh.minecraft.wiki/w/%E7%BA%B9%E7%90%86%E5%8C%85) 已经将此翻译纠正，希望大家在以后的谈论中尽量**使用正确的译名**。

在本文中，我们将会全程使用*资源包*。

## 资源包分辨率

参阅：[术语表 - 分辨率](terms.md#分辨率)

很多资源包名中会附带有一个标注，通常是类似 *32x*、*256x*、*2k* 这样的*数字+字母*格式。
这是资源包纹理的**分辨率**，这里对资源包中的分辨率稍作解释：

资源包中的纹理通常为**正方形**，在**动态纹理贴图**中，纵向分辨率是横向分辨率的**整数倍**。这使得纹理的分辨率标注相比较通常意义上有一些区别

- *32x*、*64x*、*128x*... *Nx*：表示该资源包的基本贴图尺寸均为：
$$ N \times N $$
  - 在动态纹理贴图中，纵向分辨率还需要乘以动态纹理的帧数 ***F*** ，于是最终我们的贴图分辨率为：
  $$ N \times N \times F $$
- *1k*、*2k*、*4k*... *Nk*：表示所有贴图均为 *Nk \* Nk* 像素的尺寸：
$$ 1\text{k} = 1024 $$
- *N* 在 *JE* 中必须为**2的整数次幂**。

## 资源包的版本兼容性 <sup>JE</sup>

### 粗略区间

在 *JE 1.13* 时，Mojang 进行了一轮游戏代码重写，这轮重写包含了一次对方块 ID 和命名方法的统一修改，称为***扁平化***，这也导致了自 *JE 1.13* 开始，资源包的兼容性出现了**断层**：

|    兼容范围     |
| :------------: |
| 1.6.1 ~ 1.12.2 |
|      1.13 +    |

对于**大部分**的资源包，只需要选择在区间内的正确版本，即可正常加载。  
有一些例外情况是，Mojang在某些版本中**更改了方块的代码名**，比如*草*（`grass`）在 *JE 1.20.3* 中被改为了*矮草丛*（`short_grass`），这时候就会导致新旧资源包和版本间的不兼容。

### 准确区间

虽然在粗略兼容区间内，但有时候资源包列表仍然会标红且提示 *适用于<新/旧>版本的Minecraft* ，这是因为实际上资源包的区间分为更复杂的许多段。同时为了避免上述例外情况的发生，我们就需要知道准确的兼容区间。

#### pack.mcmeta

版本区间由资源包内一个名为 `pack.mcmeta` 的文件

```json:no-line-numbers{3}
{
  "pack": {
    "pack_format": N,
    "description": "..."
  }
}
```

中的 `pack_format` 版本号 `N` 定义，`descripton` 则是该资源包的**描述**。

以下是**截止 2024 年 1 月 20 日**的资源包版本号与对应游戏版本的表格，数据来源于 [Minecraft Wiki](https://zh.minecraft.wiki/w/%E6%95%99%E7%A8%8B/%E5%88%B6%E4%BD%9C%E8%B5%84%E6%BA%90%E5%8C%85#pack_format)：

| `N`    | 起始版本       | 终止版本       |
| :----: | :-----------: | :-----------: |
| 1      | 1.6.1 13w24a  | 1.8.9         |
| 2      | 1.9 15w31a    | 1.10.2        |
| 3      | 1.11 16w32a   | 1.13 17w47b   |
| 4      | 1.13 17w48a   | 1.15 19w46b   |
| 5      | 1.15-pre1     | 1.16.2-pre3   |
| 6      | 1.16.2-rc1    | 1.16.5        |
| 7      | 1.17 20w45a   | 1.17.1 21w38a |
| 8      | 1.18 21w39a   | 1.18.2        |
| 9      | 1.19 22w11a   | 1.19.2        |
| 11     | 1.19.3 22w42a | 1.19.3 22w44a |
| 12     | 1.19.3 22w45a | 1.19.4 23w07a |
| 13     | 1.19.4-pre1   | 1.20 23w13a   |
| 14     | 1.20 23w14a   | 1.20 23w16a   |
| 15     | 1.20 23w17a   | 1.20.1        |
| 16     | 1.20.2        | 1.20.2 23w31a |
| 17     | 1.20.2 23w31a | 1.20.2-pre1   |
| 18     | 1.20.2-pre2   | 1.20.3 23w41a |
| 19     | 1.20.3 23w42a | *仅存在一个版本* |
| 20     | 1.20.3 23w43a | 1.20.3 23w44a |
| 21     | 1.20.3 23w45a | 1.20.3 23w46a |
| 22     | 1.20.3-pre1   | 1.20.5 23w51b |
| 24     | 1.20.5 24w03a | *最新*         |

*什么？你问我 23 去哪了？可能是因为今年是 24 年，Mojang 跳过了吧（笑）。*

从 *JE 1.15* 开始，版本之间只要存在不兼容的地方，资源包版本号就会更新。

- 例如 *JE 1.15* 与 *JE 1.16* 之间更新了墙类方块的方块状态，即便有些资源包并未涉及此内容，只要 `pack.mcmeta` 内的版本号不同，游戏内依然会显示不兼容。
- 因此资源包的兼容性在绝大多数下应以**作者本人的解释为标准**，而不是游戏内是否显示不兼容。

## 资源包加载顺序

资源包加载顺序为**由低到高**。即

- 放置在**顶部**的资源包在加载时会覆盖下方资源包中重名的文件。
- 顶部资源包缺失的贴图，将由下方资源包补齐。

因此一些 `基础包` + `增强包` ／ `附属包`（通常名为 Addon）组合形式的资源包，应把基础包置于**底部**。

## 贴图类型

### 原版贴图

原版贴图名称一般为 `<name>.png` 。

原版贴图由 Minecraft 原生提供支持。许多老牌资源包如***舒服细致***（Soartex）、***五边形***（BDCraft）等即为只提供原版贴图的资源包。

### 着色贴图 <sup>JE MOD</sup>

**读取这些贴图需要 MOD 支持，具体作用需要光影支持。**

着色贴图有***反射贴图***（Specular map）和***法线贴图***（Normal map）两种。

- *法线贴图*的命名方法为 `<name>_n.png` 。
- *反射贴图*的命名方法为 `<name>_s.png` 。

*OptiFine* 同时支持一些其它的特殊贴图，如 *CTM*、*CIT*、*CEM* 等。简述见 [#特殊贴图](#特殊贴图-optifine) 。

#### 法线贴图

参阅：[术语表 - 法线贴图](terms.md#法线贴图)

这里列出了每个通道的作用：

- *R* ：表面**向右**倾斜的量。
- *G* ：表面**向下**倾斜的量。
- *B* ：表面**向前**的量。它的值可以由 `R` 和 `G` 计算得到，因此在 *JE* 现行 PBR 标准中，该通道可以独立出来做特殊用途，详见 [#PBR标准](#pbr-标准) 。
- *A* ：通常用于**视差**。

*RG* 分量的作用由 *OpenGL 特性* 决定，如果要改为其他读取方式，需要做一些转换。

#### 反射贴图

用于告诉着色器物体的性质，每个颜色通道在不同的标准中有着不同的定义，详见 [#PBR标准](#pbr-标准) 。

### 特殊贴图 <sup>OptiFine</sup>

| 名称                     | 简写  | 用途             |
| ------------------------ | :---: | ---------------- |
| Connected Textures Model |  CTM  | 方块间的纹理衔接 |
| Custom Item Textures     |  CIT  | 自定义物品纹理   |
| Custom Entity Models     |  CEM  | 自定义实体模型   |
| Graphical User Interface |  GUI  | 自定义游戏界面   |
| Animation                |   -   | 自定义动态纹理   |
| Emissive Textures        |   -   | 自发光纹理       |
| Random Entities          |   -   | 随机实体纹理     |
| Natural Textures         |   -   | 自然纹理         |
| Custom Sky               |   -   | 自定义天空       |

这些贴图可以在 *OptiFine* 中使用，也可以使用其他 MOD 实现。  
详细介绍可参考 MCBBS 纹理版版主 *SQwatermark* 翻译的 [OptiFine官方文档](http://sqwatermark.com/resguide/optifinedoc/) 。

## PBR 标准

参阅：[术语表 - PBR](terms.md#pbr)

PBR 有两种工作流，一种是***金属／粗糙度***，另一种是***镜面反射／光泽度***。  
对于 PBR 贴图上的通道的定义，在 MC 中有着不同的标准，例如 *OldPBR* <sup>JE</sup> 、*LabPBR* <sup>JE</sup> 、*四合一PBR* <sup>BE</sup>等。

- *OldPBR* 是过时的 PBR 标准，在此不做讨论。
- *LabPBR 1.3* 是 *JE* 的约定现行标准，工作流为***金属／粗糙度***。其*材质属性*由 `_n` 和 `_s` 贴图**共同定义**。
  - `_n` 贴图：
    - `R` `G` `A`：与 [前文](#法线贴图) 一致。
    - `B` ：[纹理环境光遮蔽](terms.md#ao)（Texture AO）强度。
  - `_s` 贴图：
    - `R` ：**光滑度**。
    - `G` ：**金属度**，`230` 及以上的数值代表**特定金属**，**详见下方链接**。
    - `B` ：[`0`, `64`] 表示**孔隙度**， [`65`, `255`] 表示**次表面散射强度**。
    - `A` ：**自发光**，[`1`, `254`] 范围内数值越大发光越强，当值为 `255` （即完全不透明）时不发光。
  - 关于 LabPBR 的更多详细介绍，可参考 [官方文档](https://wiki.shaderlabs.org/wiki/LabPBR_Material_Standard) 。
- `四合一PBR` 是目前BE的约定现行标准。
  - 主要为将 `主场景` 、`法线场景` 、`PBR贴图场景` 和附加的 `独立检测场景` 拼合到 [一张图](terms.md#缓冲区) 内，得以实现光影读取。
  - **四合一标准详见 BE 光影 *YSS* 压缩包内的开发文档。**
