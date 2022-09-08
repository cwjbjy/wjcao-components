---
title: git开发流程
order: 1
toc: menu
---

在开发中，正确使用 git 能让开发事半功倍，下面我简单介绍一下在开发中的一些常见 git 操作。

## 分支功能介绍

我们在项目开发中，会用到如下几个不同分支。

| 序号 | 分支        | 介绍                       |
| ---- | ----------- | -------------------------- |
| 1    | `dev`       | 开发分支                   |
| 2    | `test`      | 测试分支，内网环境         |
| 3    | `release`   | 待发布分支，外网环境       |
| 4    | `master`    | 外网分支                   |
| 5    | `feature/*` | 功能分支                   |
| 6    | `bug/*`     | bug 分支，用于修复外网 bug |

不同的分支在不同的应用场景中扮演着重要的角色，所以，选择正确的分支进行开发至关重要。介绍分支显然不能脱离它的应用场景，那么，先了解一下我们开发时常见的场景有哪些。

开发中，常见的有主要有如下几个场景

1. 内网开发新功能
2. 修复未发布到外网的 bug
3. 修复已发布到外网的 bug

### 内网开发新功能

**1. 在功能分支上开发新功能**

按照我们现在的开发流程，新功能肯定会对应一个禅道号，我们依据于禅道上的需求进行开发。

假如，我们有一个需求号为`1650`，这时候需要创建一个功能分支`feature/#1650`。问题来了，该从哪一个分支去创建？

由于新功能开发不能夹带没有升级到外网的代码，我们需要保证开发的分支是干净的。所谓干净的分支，就是说分支的代码要和外网的代码保持一致，而`release`分支正好对应的是外网的代码，所以，开发新需求，我们需要从`release`分支去创建功能分支。

为了保证 release 分支最新的 commit 记录，先 fetch 一下。

```bash
git fetch origin release
```

然后，以远程`release`为基准创建功能分支。

```bash
git checkout -b feature/#1650 origin/release
```

在开发中，我们可以在`feature/#1650`分支上提交很多个 commit 记录，到达一个开发阶段之后，比如需要给产品测试，我们需要把代码提交到内网 dev 环境，由于`dev`分支对应的是 dev 环境，所以，我们需要把功能分支上的提交合并到`dev`分支上。

首先切换到`dev`分支。

```bash
git checkout dev
```

我们选择`rebase`方式合并代码，为了不破坏原始的提交记录，让记录保持线性。

```bash
git pull origin dev --rebase
```

之后执行合并操作。

```bash
git merge "feature/#1650" -m "merge: 合并#1650需求 (story#1650)"
```

如果出现冲突，解决冲突，解决完冲突继续合并。

```bash
git merge --continue
```

合并结束后，将最终代码`push`到远程`dev`分支。

```bash
git push origin dev
```

你可以把`feature/#1650`分支推送到远端，也可以选择不推送。如果推送的话，要记得在`release`发布之后将功能分支及时删除，防止无用远程分支过多。

**2. 在内网 dev 分支上开发新功能**

请记住，**避免**在 `dev` 分支直接开发新功能。如果你忘记创建功能分支，不小心在 `dev` 分支上提交了新需求的代码，可以按照如下步骤去操作。

第一种情况，还没有 `commit`

可以先执行`git stash`，将代码先暂存起来，然后切换到功能分支，执行`git stash pop`将暂存的代码释放出来。然后在功能分支开发即可。

第二种情况，已经在 `dev` 分支上 `commit` 过

首先，把 `dev` 分支上该需求的提交过滤出来，复制所有关于该需求提交的 hash 值，注意多个哈希值是按时间的正序排列，即最早提交的 hash 在前，后提交的 hash 在后

紧接着，切换到功能分支，执行 `cherry-pick`，将刚才选中的提交 hash 全部 `cherry-pick` 到功能分支上。

```bash
git checkout feature/xxx
git cherry-pick -x hash1 hash2 ...
```

如果出现冲突，请解决冲突，解决完执行 `git cherry-pick --continue` 继续，直到结束。

之后，开发在功能分支上即可。剩下的操作，和上述“_在功能分支上开发新功能_”一致，不再赘述。

### 修复未发布到外网的 bug

每一个 bug 肯定对应一个禅道 bug 编号，而禅道上的 bug 肯定是经过产品或测试的同事测出来提的 bug，所以代码肯定是已经发布到 test 环境中了。那么，我们修改 bug，可以在本地的`test`分支中直接修改，改完直接`push`到远程的`test`分支。

首先，切换到`test`分支。

```bash
git checkout test
```

然后在`test`上修改 bug。

```bash
git add .
git commit -m "fix: xxxxx (bug#123)"
...
git commit -m "fix: xxxx2 (bug#123)"
```

改完之后推送到`test`分支。

```bash
git pull origin test --rebase
git push origin test
```

### 修复已发布到外网的 bug

外网出 bug 肯定要在外网的代码基础之上去修改。所以需要从`release`分支去创建`bug`分支，这里创建分支需要携带 bug 号。

假如禅道的 bug 号是`123`，首先从`release`创建`bug/#123`分支。

```bash
git checkout -b bug/#123 origin/release
```

然后在`bug/#123`修复 bug，之后提交到远程的`bugfix`分支，如果没有则创建。

等到 bug 全部修复结束时，先`merge`到`dev`和`test`分支，测试通过后再合并到`release`分支并删除`bugfix`分支。

### rebase 还是 merge

虽然，`rebase`和`merge`都可以合并代码，但是，两者是有区别的。

`merge`在非快合的情况下会产生一条额外的 commit 记录，提交记录是分叉的

合并前

```
-     C dev
    /
A---B master

```

合并后

```
-    C ---
    /    \
A---B-----D(合并)

```

`rebase`会改变拉出分支的位置，不会产生额外的 commit 记录，并且提交记录是一条直线

合并前

```
-    C dev
    /
A---B---D master
```

合并后

```
A---B---C---D
```
