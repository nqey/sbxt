#!/bin/sh
PROJECT_NAME="exam"
SVN_PATH="https://svn.lh-xm.com/svn/CPS/Server/J2EE/web/${PROJECT_NAME}"
PROJECT_PATH="/usr/tools/deploy/web"

# 1. 删除原有项目
[ -d ${PROJECT_PATH}/${PROJECT_NAME} ] && rm -rf ${PROJECT_PATH}/${PROJECT_NAME}

# 2. 下载最新项目
svn co ${SVN_PATH} ${PROJECT_PATH}/${PROJECT_NAME}