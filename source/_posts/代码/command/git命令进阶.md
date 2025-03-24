---
title: git备忘
tags:
  - git
categories:
  - 代码
date: 2025-02-26 15:16:00
updated: 
cover: https://lsky.kissshot.site/img/2025/03/24/67e1171d6e49a.webp
---
# 选择性同步分支

main分支要选择性地合并dev分支的提交

`git checkout main`

`git cherry-pick h7i8j9k a1b2c3d ` # 按提交顺序操作

若存在冲突，解决冲突后

`git cherry-pick --continue`

# 合并提交

本地有三次提交，第一次提交的父节点hash为9s8df4s6f

>第三次提交  e6ec961  2025/2/26 15:15:00
>第二次提交  1a2b3c4  2025/2/26 13:15:00
>第一次提交  5d6e7f8  2025/2/26 10:15:00

```bash
git rebase -i 9s8df4s6f # 合并从指定 commit 后的提交
# 或
git rebase -i HEAD~3   # 合并最近3次提交
```

在打开的交互式编辑器中，将需要合并的 commit 前的 `pick` 改为 `squash`（或简写 s），保留一个 pick 作为合并后的主提交
# 修改历史某次提交信息

将 `<commit-id>` 替换为目标提交的前一个提交哈希值

```bash
git rebase -i <commit-id>
```

在打开的交互式编辑器中，将需要修改的 commit 前的 `pick` 改为 `reword`（或简写 r）

完成变基并强制推送
```bash
git rebase --continue  # 若中途无冲突会自动完成
git push --force  # 覆盖远程历史，需谨慎操作
```

>**强制推送风险**：修改已推送的提交会改变其哈希值
>**备份分支**：操作前建议创建备份分支`git branch backup`，防止变基失败后无法恢复