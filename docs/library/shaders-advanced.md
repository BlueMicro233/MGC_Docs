# 着色器 技术科普

::: tip 阅读建议
这篇文档是技术的实际应用，在阅读前你可以先阅读下列文章来了解其基本概念：  
- [着色器 基本概念](shaders.md)
:::
<!--
重写大纲

着色器的细节概念
  顶点着色器、片段着色器……
  着色器的管线
    JE OptiFine的渲染管线
一个三角面的诞生
  顶点着色器
  片段着色器
全局光照的概念
  直接光照
  间接光照
光线追踪
  传统渲染的局限性
  光线追踪的概念
  路径追踪？
  光线追踪歧义纠正
-->

## 我们的场景在着色器中发生了什么？

一个着色器中又可以细分为多个阶段，也就是我们常说的顶点着色器、像素着色器等，这里按照通常管线的顺序，简单列举一下每种着色器计算的对象：
- 顶点着色器：Vertex Shader，它的主要职责是变换坐标，包括顶点坐标、纹理坐标等，计算对象为每一个顶点。
- 几何着色器：Geometry Shader，这个阶段是**可选的**，它的主要职责是生成新的顶点，计算对象是每个三角形。
- 片段着色器：Fragment Shader，根据它所计算的对象，我们也将其称为**像素着色器**。它的计算对象是每一个像素。
- 计算着色器：Compute Shader，这个阶段是**可选的**，它负责进行抽象计算，可以存取任意的[缓冲区](terms.md#缓冲区)，但是不能传入自定义变量，也没有默认输出。

## 光线追踪、路径追踪

> 阅前提示：我们在此讨论的是相对狭义的光线追踪技术，即大众所认知的。如果严格按照光线追踪渲染流程来评判，那么类似于屏幕空间反射等技术也算是光线追踪。

### 前言：从光栅化到光线追踪

- 上世纪70年代，`PARC`开发了具备8位帧缓冲器的先进绘图系统，标志着光栅化成像技术的诞生。这一技术能够在屏幕上呈现复杂图形画面，为现代计算机图形学的发展奠定了基础。
- 在现代光栅化渲染过程中，需要将三维场景转换为二维图像，通过将场景中的对象分解成三角形，并映射到屏幕像素上来实现。虽然这种方法在速度上非常高效，但在处理屏幕空间之外的物体时存在着一些困难。
- 随着硬件性能的不断提升，人们开始寻求更加真实的渲染技术，光线追踪技术就此走上实时渲染的舞台 **（离线渲染领域一直在使用光线追踪）**。光线追踪技术模拟了光线在三维空间中的行为，从而提供了更加真实动态的光照效果。


### 光线追踪

- **1968年，`Arthur Appel`首次提出了`光线投射`的概念，形成了光线追踪技术的雏形**。光线投射技术从一个点向一个方向发射出光线，与场景中的物体相交时停止。
- 随后的二十年里，`Turner Whitted`和`Robert Cook`分别提出了`递归光线追踪`和`分布光线追踪`，实现了光线追踪中光线的反射、折射和散射三大机制。伴随着时间的推移，光线追踪技术和硬件水平不断提高，最终成功登上了实时渲染的舞台。
- 目前应用的光线追踪技术，大多数是**从视点出发追踪到光源**，而非直接从光源出发。这种技术遵循物理上的**光路可逆**原则，同时能减少性能消耗。在开始之前，需要先通过切割立方体（基本是 Minecraft 专用）或切割三角面两种方式，构建三维空间，然后按照下图所示的流程进行光线追踪渲染（以下为简化流程图）。
![RT.png](/images/library/RT.png "光线追踪流程图")

### 路径追踪

- 如果要提到路径追踪，我们想先介绍**计算机图形学领域的大师——`Jim Kajiya`**。作为先驱之一，他的贡献为整个行业带来了深远影响。
- **`Kajiya`最著名的贡献就是`渲染方程`的提出**，这是计算机图形学中极为重要的理论基础，于**1986年**问世。该方程描述了三维场景中光线的传播及相互作用，至今仍是全局照明算法的核心。由于引入了辐射度量学，它有效终结了图形渲染混乱无章的时代，使得渲染过程朝着物理准确性迈进。
- **路径追踪正是基于渲染方程，同样由`Kajiya`所提出**。不过由于很多时候无法直接解析渲染方程中的积分，因此采用`蒙特卡洛积分法`，通过随机采样光线路径来估计积分值，从而获得最终的渲染结果。**`蒙特卡洛积分法`是利用随机采样估计数值积分的一种方法**，在路径追踪中，它被用于计算光线在场景中相互作用后产生的散射效果。
- 与光线追踪流程相比，路径追踪在求出交点后，会根据物体材质属性随机选择新的传播方向，继续追踪光线，重复上述过程，直至光线抵达光源，最后将所有采样光线的贡献累加，从而计算出像素颜色。

### 光线追踪在 Minecraft：Java 版中的应用

- **在`Java版`中，我们主要使用`路径追踪`。** 在此之前的光影，考虑到`Minecraft`游戏过程的动态性和一些算法限制，没办法像其他游戏一样使用`预烘焙`等类似技术来改善光栅化渲染。例如光源仅能按照原版的发光机制来单色发光；反射面完全无法反射屏幕外的物体（天空部分除外）等。因此，在传统的`Java版`光影中，效果相比其他光栅化游戏显得较为逊色，而光线追踪的实现为`Java版`带来了光影效果的重大革新。
- **最早由`SEUS`光影作者`Cody`在2018年2月演示了`Minecraft`中的光线追踪实现**，这甚至早于 RTX 显卡的发布。其原理是将原本用于绘制阴影的`ShadowMap`转化到三维空间中进行`路径追踪`计算。不过，在`ShadowMap`中，阴影距离与阴影分辨率存在一定关联，这一特性也继承到了光线追踪中，并且为了避免光线追踪阴影的巨大性能消耗，仍要将一些分辨率留给原来的阴影，这极大限制了光线追踪的最大距离。使用 16384 这样的极限阴影分辨率，才能支持相对远距离的光线追踪，而这几乎必然会导致性能爆炸，不过有些光影在尝试改善这一点。
  - **截止到目前，`Vulkanite`模组为光影引入了`Vulkan`**，解决了诸多技术问题，并支持调用`光线追踪加速单元（RT Core）`来提升性能。但**该模组本身的完成度仍是个问题，因此目前难以依赖，后面也先不讨论使用该模组的情况。**
- 由于使用的是`OpenGL`，`Java`版光线追踪**无法调用光线追踪加速硬件**。光影作者们的应对方法是使用`辐照度缓存`来优化计算量，同时采用`SVGF过滤器`进行降噪处理。
  - `辐照度`（在此类场景中也可称为`照度`，即光学单位`lux`）缓存通过预计算并存储场景中特定点的辐射度信息，然后在渲染时对这些数据进行插值，从而快速估算其他点的辐射度，避免对场景中每个像素进行复杂的光照计算，节省计算资源和时间。
  - `SVGF过滤器`结合时间和空间上的信息进行滤波。利用过去几帧的信息来估计当前像素区域样本分布的方差，然后据此进行空间滤波。这种方法可以减少噪点达到`降噪`目的。
  - 不过上述过程会导致暗光下发生闪烁、拖影和纹理细节损失等问题，这也是目前必须妥协的问题。
- 此外，有时我们还能在一些光影中见到`SSPT（屏幕空间路径追踪）`，其在路径追踪的基础上加以限制，使其**只计算屏幕内的物体**。这种方案能够避免不少完整光追的性能问题（包括距离问题），同时大幅提升性能，但又陷入了只能处理屏幕内物体的问题。
- **以下是一些光线追踪在`Minecraft`中应用的对比展示：**
  - 光线追踪全局光照
  ![shader1RT.png](/images/library/shader1RT.png "光线追踪全局光照")
  ![shader1.png](/images/library/shader1.png "RSM全局光照")
  - 反射视野外的物体
  ![shader2RT.png](/images/library/shader2RT.png "光线追踪反射")
  ![shader2.png](/images/library/shader2.png "屏幕空间反射")
  - 完整的光源特性支持
  ![shader3RT.png](/images/library/shader3RT.png "光线追踪光源特性")
  ![shader3.png](/images/library/shader3.png "原版光源特性")
  - 除此之外，光线追踪还有折射、散射、阴影和更好的PBR特性支持等功能，不过相对细枝末节，或者是很少有在`Java版`实现，因此不做另外展示。

### 商业上的光追相关概念

本段主要谈论光追的一些商业概念与伪光追。在阅读本段之前我们建议你先查看以下内容进行简单了解。

- [MGC 误区纠正](correction/rt_misunderstanding.md)

- 在`英伟达`、`AMD`和`英特尔`推出的现代高性能显卡中，均内置了`光线追踪加速单元`。光线追踪流程涉及大量计算密集型的步骤，这些步骤的工作流程相对固定，因此业界专门设计了一种`加速电路`来分担任务。如我们在之前展示的光线追踪流程图所示，**加速单元主要用于加速求交等部分的计算**。而且，**在光线追踪流程中的大量着色器仍需要传统的通用计算单元参与计算。** 因此，凭借 **"非硬件光追"无法说明一个光影是`伪光追`。**
- 对于`全景光线追踪`，也就是`英伟达所宣传的路径追踪`，实为一种营销概念，而先前`英伟达提出的光线追踪`，也属于其中。在这里援引`英伟达RTX Remix`开发团队的顶级工程师之一`Mark`所提到的：**“英伟达营销部门显然不喜欢"混合光追与完全光追"这样的术语，所以他们将光栅化与光线追踪混合渲染的称为"光线追踪"，而将完全光追称为"路径追踪、全景光线追踪" …这些术语的定义已经变得很模糊了”**（文本经轻微修改以更好的解释相关概念，并不影响原意）。因此，即使**使用了混合光栅化技术的光线追踪，也无法说明一个光影是`伪光追`。**
- 另外，手机芯片厂商也陆续推出了支持光线追踪的手机芯片，尽管实现方案可能有所差异，但这并不影响**光线追踪能够在手机上运行**的事实；**光线追踪本质上是一种通用算法**，仍属于数学计算，在`CPU`上运行也是可行的，且已有 up主 演示过了运行在`CPU`上的光线追踪，像目前的`人工智能`也一样能依靠纯`CPU`运行，甚至还有人展示过用纸笔演算`挖矿`的方式，尽管效率极低。因此，凭借 **“能在手机/CPU上运行”，仍然无法说明一个光影是`伪光追`。**
- 最后要说的是，**`伪光追`这个概念在图形学专业领域中实际上是不存在的**，它主要源于**民间社区中的以谣传遥**。**英伟达在商业营销宣传中对光线追踪技术的命名和解释不恰当，导致定义模糊**，也是这一错误概念广泛流传的可能原因。因此，我们希望大家能够正视社区中的光线追踪光影，不要被错误概念所迷惑，在发现这一概念被误用时，积极进行科普解释，维护社区和圈子的环境。

#### 相关资料

- [BSL到底是不是光追？光追为mc带来了什么？【素影之下 #2】×【光影实验室 #3】](https://www.bilibili.com/video/BV1X54y1v7za?zw)
- 以下图片摘自`20系显卡`发布会，提到了`RTX显卡`是`GTX显卡`光追性能的数倍，可见即使是`GTX显卡`也有光追能力
![QQ截图20221025102723.png](/images/library/QQ截图20221025102723.png "即使是GTX系列显卡也有着光追计算能力")
- B站著名up`极客湾`使用`骁龙845`在`Win Arm`上使用纯`CPU`运行 PC 端光线追踪 demo，大约在末尾部分`23:40`处提到
- [给手机装Windows11！还能玩大型游戏？！](https://www.bilibili.com/video/BV1MU4y137Yi)
- `英伟达RTX Remix`团队顶级工程师`Mark`的语录：
![图片](/images/library/nv_mark_0.jpg "术语变化")
> 旧行业术语：
> 光线追踪 = 30 年前的原始技术，光线在碰到某物时停止。
> 路径追踪 = 对光线追踪的明显升级，在此技术中，你会追踪光子的完整路径，包括反射、折射等。
> 
> 现在人们在混合渲染引擎中称为光线追踪的所有东西，实际上是我所说的路径追踪。现在已经没有人真正只做基础的光线追踪了。
> 
> 这些营销术语实际上想要表达的区别：
> 
> 现代营销术语：
> 光线追踪 = 混合渲染引擎使用一些路径追踪技术，向主要的光栅管线添加信息。
> 路径追踪 = 完全不使用光栅化的路径追踪渲染引擎。

![图片](/images/library/nv_mark_2.jpg)
> NVIDIA 的营销部门似乎不喜欢“混合渲染 vs 完全光线追踪”这样的说法，所以他们将混合渲染称为“光线追踪”，然后将完全光线追踪称为“路径追踪”。...践踏这些术语本已薄弱的定义。

![图片](/images/library/nv_mark_1.jpg)
> 所以在这次对话之后，我又做了一些关于“光线追踪”和“路径追踪”区别的研究，并且觉得我应该发布一些澄清：
> 
> 光线追踪：
> * 核心渲染仍然使用光栅管线完成
> * 诸如阴影、反射、全局照明等单独效果通过光线追踪完成，然后与光栅管线集成
> * 这是目前市场上大多数光线追踪游戏所采用的方法
> * 在 RTX 20 系列之前，即使是这样的实时渲染也被认为是疯狂的
> 
> 路径追踪（或全景光线追踪）：
> * 所有渲染都通过光线追踪完成
> * 整个照明算法简单而优雅
> * 完全不使用光栅渲染
> * 电影行业已经使用这种技术很长时间了
> * RTX 版《传送门》，RTX Remix 模组，以及《赛博朋克2077》中的路径追踪模式表明，使用现代 RTX 硬件实时完成这一过程是可能的。
> 
> Nvidia的一篇博客文章详细介绍了这个话题 - 包括解释“路径追踪”术语的实际历史：
> <https://blogs.nvidia.com/log/2022/03/23/what-is-path-tracing/>

## 全局光照

### 介绍

一般来说，`全局光照`=`直接光照`+`间接光照`。全局光照，表现了直接照明和间接照明的综合效果。它有多种实现方法，例如`辐射度`、`光线追踪`、`环境光遮蔽（ambient occlusion）`、`光子贴图`、`Light Probe`等。当光从光源被发射出来后，碰到障碍物就反射和折射，经过无数次的反射和折射，物体表面和角落都会有光感，像真实的自然光。
全局光照计算量很大。渲染带有全局光照效果的图片，耗时会较长（取决于场景复杂度）。渲染静态图片可以接受这较长的耗时，但渲染视频或者应用到游戏时，要求的渲染时间就要减少很多，于是便有了**反向追踪算法（即蒙特卡洛算法）**。此算法以摄像机视角为基准，仅计算可见的地方，这样就可以在不牺牲质量的情况下提高渲染效率。

### Reflective Shadow Maps

Reflective Shadow Maps，简称RSM。它是一种实现全局光照的方式，原理为：将直接光照能够照亮的像素点作为次级光源，让它们照亮以它们为中心的像素。

- 参考资料：[【论文复现】Reflective Shadow Maps](https://zhuanlan.zhihu.com/p/357259069)

### Light Propagation Volumes

Light Propagation Volumes（光照传播体积），是CryEngine3 提出的一种实时的、无需任何预计算的全局光照技术，其在RSM和SH的基础上创造性地提出了使用体素来存储、传播间接光照的方法。
LPV首先将整个场景划分为一个个的小格子（体素），将整个场景离散开来，直接计算每个格子内的光照是不现实的，解决方法是让光照像墨滴一样在这些格子中弥散、传播，从而计算最终到达着色点的间接光照。

- 参考资料：[Light Propagation Volumes](https://zhuanlan.zhihu.com/p/412287249)

### Voxel Global Illumination

类似于LPV，Voxel Global Illumination（体素全局光照）也是一个两趟的、实时的全局光照算法，它以体积渲染作为算法核心，将场景通过体素离散化为树状结构并存储光照计算相关信息，并在渲染时通过体素圆锥追踪来计算光照，相比LPV拥有更好的效果。

- 参考资料：[Voxel Global Illumination 体素全局光照（一）](https://zhuanlan.zhihu.com/p/414691569)