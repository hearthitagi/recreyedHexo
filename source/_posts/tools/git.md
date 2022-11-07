---
title: git
date: 2022-02-22 17:08:49
updated:
tags:
     - git
categories:
     - 技术回顾
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
---
## 1.git命令

![git命令大全](https://cdn1.tianli0.top/gh/recreyed/img/post/git202210101024128.jpg)

## 2. 常用命令及原理

HEAD，它始终指向当前所处分支的最新的提交点。你所处的分支变化了，或者产生了新的提交点，HEAD就会跟着改变。

1. init

   初始化仓库

   `git init`

2. add

   添加当前目录的所有文件到暂存区

   `git add filename`

3. commit

   将暂存区的内容提交到本地仓库

   `git commit -m "explanation"`

4. branch

   | 命令                                      | 含义                                   |
   | ----------------------------------------- | -------------------------------------- |
   | **git branch**                            | **列出所有本地分支**                   |
   | **git branch -r**                         | **列出所有远程分支**                   |
   | **git branch -a**                         | **列出所有本地分支和远程分支**         |
   | **git branch [branchName]**               | **新建一个分支，但依然停留在当前分支** |
   | **git checkout -b [branchName]**          | **新建一个分支，并切换到该分支**       |
   | **git checkout [branchName]**             | **切换到指定分支，并更新工作区**       |
   | **git branch -d [branchName]**            | **删除分支**                           |
   | **git push origin --delete [branchName]** | **删除远程分支**                       |

5. push

   上传本地仓库分支到远程仓库分支，实现同步

   | 命令                                   | 含义                                       |
   | :------------------------------------- | :----------------------------------------- |
   | **git push [repository url] [branch]** | **上传本地指定分支到远程仓库**             |
   | **git push [repository url] --force**  | **强行推送当前分支到远程仓库，即使有冲突** |
   | **git push [repository url] --all**    | **推送所有分支到远程仓库**                 |

6. clone

   将远程仓库下载到本地

   `git clone [repository url]`

7. remote

   `git remote`命令列出所有远程主机。

   `git remote -v`使用`-v`选项，可以参看远程主机的网址

8. fetch

   远程主机的版本库有了更新，需要将这些更新取回本地，这时就要用到

   `git fetch [repository url]`

9. merge

   `git merge [branch]`合并指定分支到当前分支

10. pull

    `git pull`命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。远程分支是与当前分支合并

    `git pull origin <远程分支名>`

11. 其他命令

| **git status**               | **显示有变更的文件**                         |
| ---------------------------- | -------------------------------------------- |
| **git log**                  | **显示当前分支的版本历史**                   |
| **git diff**                 | **显示暂存区和工作区的差异**                 |
| **git diff HEAD**            | **显示工作区与当前分支最新commit之间的差异** |
| **git cherry-pick [commit]** | **选择一个commit，合并进当前分支**           |