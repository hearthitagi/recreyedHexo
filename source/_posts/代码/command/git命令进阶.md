---
title: git进阶记录
tags:
  - git
categories:
  - 代码
date: 2025-03-24 15:16:00
updated: 2025-03-28 13:38:28
cover: https://lsky.kissshot.site/img/2025/03/24/67e1171d6e49a.webp
---
# main分支要选择性的合并dev分支的提交

`git checkout main`

`git cherry-pick h7i8j9k a1b2c3d ` # 按提交顺序操作

若存在冲突，解决冲突后

`git cherry-pick --continue`

# 将本地三次提交合并为一次提交

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
**修改最近一次的提交信息：**  

`git commit --amend -m "新的提交信息"`  

然后推送到远程  

`git push origin <branch_name> --force`

**修改历史的某次提交信息：**  

`<commit-id>` 为目标提交的前一个提交哈希值  

`git rebase -i <commit-id>`

在打开的交互式编辑器中，将需要修改的 commit 前的 `pick` 改为 `reword`（或简写 r），保存后Git会停在标记为 edit的提交上
`git commit --amend -m "新的提交信息"`

完成变基并强制推送
```bash
git rebase --continue  # 若中途无冲突会自动完成
git push --force  # 覆盖远程历史，需谨慎操作
```

>**强制推送风险**：修改已推送的提交会改变其哈希值
>**备份分支**：操作前建议创建备份分支`git branch backup`，防止变基失败后无法恢复


# 撤销过去的某一次提交

找到提交的哈希值`<commit_hash>`

```shell
git revert <commit_hash>
```

解决可能出现的冲突

```shell
git add .           # 标记冲突已解决
git revert --continue  # 继续完成撤销操作
```

推送到远程

**补充**：
```shell
git revert <commit_hash_1> <commit_hash_2>  # 一次撤销多个提交
git revert <oldest_hash>..<newest_hash>  # 撤销从 oldest_hash 到 newest_hash 之间的提交

# 如果目标提交是合并操作生成的，需用 -m 指定主父分支（通常是 1）：
git revert -m 1 <merge_commit_hash>
```

# 回退远程提交并保留本地修改
如果想回退上一次提交
`git reset --mixed HEAD~1`
如果想回退指定提交之后
`git reset --mixed <commit_hash>`

然后推送到远程
`git push origin <branch_name> --force`

# 将本地的修改放到指定的分支上
将本地修改暂存  
`git stash`

切换到目标分支  
`git checkout <target_branch>`

应用暂存的修改  
`git stash pop`

# 错误地在 dev 分支上创建了 hotfix 分支并提交到远程，需要将 hotfix 分支的修改迁移到master分支
切换到hotfix分支  
`git checkout hotfix`

迁移提交  

git rebase --onto <新的基准分支> <原基准分支> <当前分支>
`git rebase --onto master dev hotfix`

解决可能出现的冲突

推送到远程  
`git push origin hotfix --force`