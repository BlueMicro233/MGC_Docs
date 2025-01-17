# 视频设置问题

::: warning 未经优化的文档
这篇文档的格式较为不规范，目前正在订正中。
:::

## 主菜单

### 图像品质

确保此选项为`高品质`。不要将其设置为流畅，*很容易导致树叶、草地等贴图效果不正常*。

![图片](/images/library/qas/je/quality.png)  
**问题截图**

### 亮度

设置为一个`合理的值`。不要用 Mods 或手动编辑 *options.txt* 将其设置为一个极端的值。

## 子菜单-品质

### Mipmap级别

有时会在 1.19 以上的 OptiFine 版本中破坏光影包。如果你发现*所有方块的面都被从对角线切割成了两个三角形，并且有一半的三角形被对角线的平行线填满*，请把它拉至`关闭`。

MipMap 还会破坏一些 Shader 的自发光渲染。一旦纹理包含自发光，视差所有凹下去的地方边缘都会异常发光。如果你有这方面的问题，请将其`关闭`。

![图片](/images/library/qas/je/mipmap.png)  
**问题截图1-贴图显示错误**

![图片](/images/library/qas/je/line.png)  
**问题截图2-偶尔还会导致视线内出现横线**

### 各向异性过滤

有时会破坏使用虚化的光影包。如果你看见*天空有奇怪的线条或撕裂*，同时*地面上出现了一道道横线*，请把它关闭。同时注意关闭显卡驱动设置中的该选项或将其设置为`由应用程序决定`。

![图片](/images/library/qas/je/cloud.png)  
**问题截图**

### 自发光纹理

使用 OptiFine 的发光纹理的资源包与使用镜面数据的光影包不能很好地配合。如果你有这方面的问题，请将其`关闭`。

### 更好的草地

有时会导致*资源包的正常侧面（草皮+泥土）变为顶面的草地*。如果你有这方面问题，请将其`关闭`。

### 连接纹理

有时会破坏使用视差遮蔽贴图（简称POM）的光影包。如果你有这方面的问题，请将其`关闭`。

### 自然纹理

有时会破坏使用视差遮蔽贴图（简称POM）的光影包。如果你有这方面的问题，请将其`关闭`。

### 自定义天空

使用 OptiFine 自定义天空的资源包与大多数光影包不兼容。在**同时使用此类资源包和光影**时，请将其`关闭`。

## 子菜单-细节

### 云

原版云总是不能与光影包兼容，特别是在旧版本中。如果你看到*疑似原版云在天空表现违和*，请将其`关闭`。

![图片](/images/library/qas/je/cloud-origin.png)  
**问题截图**

### 树

如果*树叶呈现出 X 射线风格*，请将其设置为`高品质`。

![图片](/images/library/qas/je/leaves.jpg)  
**问题截图**

### 天空

将其`打开`。

### 替选方块

这有时会破坏使用视差遮蔽映射（简称 POM）的光影包。有时会使贴图产生**拉伸的奇怪效果**，同时左上角报代号 `1281` 的 OpenGL 渲染错误。如果你有这方面的问题，请将其`关闭`。

但在一些带有 CTM 贴图（连接纹理贴图）的资源包中，此选项必须打开以获得最佳效果。

![图片](/images/library/qas/je/draw.png)  
**问题截图**

## 子菜单-性能

### 快速渲染

这有时会以不可预知的方式破坏光影包。如果你有这方面的问题，请将其设置为`关闭`。

## 子菜单-光影

### 渲染精细度

这有时会以不可预知的方式破坏光影包。最好是将其设置为 `1x`。

### 阴影精细度

这有时会以不可预知的方式破坏光影包。最好是把将其设置为 `1x`。

### 经典光效

这有时会使区块看起来比它们应该有的更亮或更暗。最好是将其设置为`默认值`。
