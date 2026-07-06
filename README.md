Node.js项目创建




global_profile_clash_verge.js

添加负载均衡策略组 addLoadBalanceGroup

给hy2节点添加端口跳跃间隔  add_hop_interval

addLoadProxies 添加节点 节点类型分为hysteria2,vless,vmess，trojan，shadowsocks，socks5，http，snell，wireguard，mtproto

dialer_proxy_clash_verge 链式代理，目前只写了clash meta 的dialer-proxy

rules_update 修改分流规则，防止规则不走向自己添加的负载均衡策略组

```json
.gitignore 的作用只有一个：
✔ 阻止文件进入 Git 追踪（index）
它不会：
❌ 隐藏文件
❌ 从磁盘删除
❌ 从 git status 完全消失（除非是 ignored + clean 显示模式）

// 让 status 不显示 ignored 文件
git status --ignored

git check-ignore -v node_modules/


C:\Code_Program\clash_profile>git status --ignored
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        .vscode/
        README.md
        clash_verg_template.js
        global_profile_clash_verge.js
        package.json
        profile.yaml
        yarn.lock

Ignored files:
  (use "git add -f <file>..." to include in what will be committed)
        node_modules/

nothing added to commit but untracked files present (use "git add" to track)

```