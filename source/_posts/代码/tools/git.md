---
title: git
tags:
  - git
categories:
  - 代码
abbrlink: 518e617c
date: 2022-02-22 17:08:49
updated:
keywords:
description:
cover:
---

**Git 常用命令**

## 1. 仓库配置

| 命令 | 说明 |
|------|------|
| `git config --global user.name "Your Name"` | 设置全局用户名 |
| `git config --global user.email "email@example.com"` | 设置全局邮箱 |
| `git config --list` | 查看当前配置信息 |

## 2. 创建与克隆仓库

| 命令 | 说明 |
|------|------|
| `git init` | 初始化新仓库 |
| `git clone <repo_url>` | 克隆远程仓库到本地 |

## 3. 更改与提交

| 命令 | 说明 |
|------|------|
| `git status` | 查看工作区状态（修改/未跟踪文件） |
| `git add <file>` | 添加文件到暂存区（`git add .` 添加所有文件） |
| `git commit -m "提交说明"` | 提交暂存区的更改到本地仓库 |
| `git commit --amend` | 修改最后一次提交 |

## 4. 分支管理

| 命令 | 说明 |
|------|------|
| `git branch` | 查看本地分支（`-a` 查看所有分支，包括远程） |
| `git branch <branch_name>` | 创建新分支 |
| `git checkout <branch_name>` | 切换到指定分支 |
| `git checkout -b <new_branch>` | 创建并切换到新分支 |
| `git switch <branch_name>` | 切换分支（推荐替代 `git checkout`） |
| `git merge <branch_name>` | 合并指定分支到当前分支 |
| `git branch -d <branch_name>` | 删除本地分支（`-D` 强制删除） |

## 5. 远程仓库交互

| 命令 | 说明 |
|------|------|
| `git remote -v` | 查看远程仓库地址 |
| `git remote add <name> <url>` | 添加远程仓库（如 `origin`） |
| `git push <remote> <branch>` | 推送本地分支到远程（如 `git push origin main`） |
| `git push -u <remote> <branch>` | 推送并设置上游分支（后续可简写 `git push`） |
| `git pull <remote> <branch>` | 拉取远程分支并合并 |
| `git fetch <remote>` | 从远程仓库拉取最新代码（不自动合并） |

## 6. 撤销与恢复

| 命令 | 说明 |
|------|------|
| `git restore <file>` | 丢弃工作区的修改（Git 2.23+） |
| `git restore --staged <file>` | 将文件移出暂存区（保留工作区修改） |
| `git reset --soft HEAD^` | 撤销最后一次提交（保留修改到暂存区） |
| `git reset --hard HEAD^` | 彻底撤销最后一次提交（慎用！） |
| `git revert <commit_id>` | 创建一个新提交来撤销指定提交 |

## 7. 标签管理

| 命令 | 说明 |
|------|------|
| `git tag` | 查看所有标签 |
| `git tag <tag_name>` | 创建轻量标签（指向当前提交） |
| `git tag -a <tag_name> -m "标签说明"` | 创建含注释的标签 |
| `git push <remote> --tags` | 推送所有标签到远程仓库 |

## 8. 查看日志与差异

| 命令 | 说明 |
|------|------|
| `git log` | 查看提交历史（`--oneline` 简化显示） |
| `git log -p <file>` | 查看文件的修改历史 |
| `git diff` | 查看工作区与暂存区的差异 |
| `git diff --staged` | 查看暂存区与仓库的差异 |

## 9. 储藏临时修改

| 命令 | 说明 |
|------|------|
| `git stash` | 储藏当前工作区和暂存区的修改 |
| `git stash list` | 查看储藏列表 |
| `git stash pop` | 恢复最新的储藏并删除储藏记录 |
| `git stash apply` | 恢复储藏但不删除记录 |

## 10. 高级操作

| 命令 | 说明 |
|------|------|
| `git rebase <branch>` | 变基操作（合并提交历史，保持线性） |
| `git cherry-pick <commit_id>` | 将指定提交应用到当前分支 |
| `git bisect` | 二分查找引入问题的提交 |

> **提示**  
> - 使用 `git <command> --help` 查看命令详细帮助  
> - 谨慎使用 `git reset --hard` 和 `git push -f`（强制推送）！