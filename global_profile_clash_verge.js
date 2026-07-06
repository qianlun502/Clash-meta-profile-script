/*
 * @Author: qianlun502 2731829639@qq.com
 * @Date: 2026-07-02 11:45:28
 * @LastEditors: qianlun502 2731829639@qq.com
 * @LastEditTime: 2026-07-06 12:23:28
 * @FilePath: \clash_profile\global_profile_clash_verge.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: qianlun502 2731829639@qq.com
 * @Date: 2026-07-02 11:45:28
 * @LastEditors: qianlun502 2731829639@qq.com
 * @LastEditTime: 2026-07-02 18:17:37
 * @FilePath: \clash_profile\global_profile_clash_verge.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const yaml = require('js-yaml');
const fs = require('fs');

// 主转换函数
function convertYamlToJson(yamlString) {
  try {

    // 加载YAML并转换为JS对象
    const jsonObj = yaml.load(yamlString);
    console.log('转换成功,打印yaml:\n', jsonObj);

    addLoadBalanceGroup(jsonObj)
    // 转换为格式化的JSON字符串
    return JSON.stringify(jsonObj, null, 2);
  } catch (e) {
    console.error('转换失败:', e.message);
    return null;
  }
}
const url_test = 'http://www.google.com/generate_204';
let new_groups = [];
const dialer_name = "dialer"; //中转节点策略组名称
// 人为添加的四个策略组对象
let lbgroups;
let lbgroups2;
let lbgroups3;
let lbgroups4;
let dialer;

const proxy_vless_50020 = {//防火墙没开这个端口,所以直接通过cf ip访问
  "name": "us-vless-dialer-50020",
  "dialer-proxy": dialer_name,
  "type": "vless",
  "server": "198.41.209.217",
  "port": 443,
  "uuid": "bbdd2373-78dc-4be2-c77d-84d7a4a1bd2f",
  "udp": true,
  "tls": true,
  "skip-cert-verify": false,
  "client-fingerprint": "random",
  "servername": "abc.learnwebs.ggff.net",
  "network": "ws",
  "ws-opts": {
    "path": "/bbdd2373",
    "headers": {
      "Host": "abc.learnwebs.ggff.net",
    },
  },
};
const proxy_vmess_50023 = {
  "name": "us-vmess-dialer-50023",
  "dialer-proxy": dialer_name,
  "type": "vmess",
  "server": "107.174.220.150",
  "port": 50023,
  "uuid": "4cd6392a-87e6-489d-a464-4495a084a346",
  "tls": false,
  "alterId": 0,
  "cipher": "auto",
  "skip-cert-verify": true,
  "network": "ws",
  "ws-opts": {
    "path": "/4cd6392a",
  },
};
//hysteria2 节点示例
const proxy_hys2 = {
  "name": "us-hysteria2-ipv4",
  "server": "107.174.220.150",
  "port": 56030,
  "ports": "56001-59000",
  "mport": "56001-59000",
  "hop-interval": 5, //端口跳跃间隔
  "udp": true,
  "skip-cert-verify": true,
  // "fingerprint": "d2fb4f1b833ee7e77e8304dc4652eb13e1b0e064e0874cde3a1a1a1660b74eef",
  "sni": "www.hoyoverse.com",
  "type": "hysteria2",
  "password": "N2Fz49Rg73",
}

const proxy_hys2_ipv6 = {
  "name": "us-hysteria2-ipv6",
  "server": "2607:9d00:2000:00d3::8c50:9244",
  "port": 54099,
  "ports": "54001-56000",
  "mport": "54001-56000",
  "hop-interval": 5, //端口跳跃间隔
  "udp": true,
  "skip-cert-verify": true,
  // "fingerprint": "d2fb4f1b833ee7e77e8304dc4652eb13e1b0e064e0874cde3a1a1a1660b74eef",
  "sni": "www.microsoft.com",
  "type": "hysteria2",
  "password": "69f4865a-f2d8-49fb-b550-e20c5ad51644",
}

//vless 节点示例
const proxy_vless = {
  "name": "us-vless-50020",
  "type": "vless",
  "server": "198.41.209.217",
  "port": 443,
  "uuid": "bbdd2373-78dc-4be2-c77d-84d7a4a1bd2f",
  "udp": true,
  "tls": true,
  "skip-cert-verify": false,
  "client-fingerprint": "random",
  "servername": "abc.learnwebs.ggff.net",
  "network": "ws",
  "ws-opts": {
    "path": "/bbdd2373",
    "headers": {
      "Host": "abc.learnwebs.ggff.net",
    },
  },
};

//anytls 节点示例 Mihomo 不支持 AnyTLS+Reality 的组合（未来也不会支持），
// 如果您想隐藏 SNI 请配合ECH使用，如果您非要使用 Reality 请选择Vmess、VLESS、Trojan协议。
const proxy_anytls = {
  "name": "anytls",
  "type": "anytls",
  "server": "107.174.220.150",
  "port": 2087,
  "password": "N2Fz49Rg73",
  "client-fingerprint": "chrome",
  "udp": true,
  "idle-session-check-interval": 30,
  "idle-session-timeout": 30,
  "min-idle-session": 0,
  "sni": "apps.mzstatic.com",
  "alpn": [
    "h3",
    "h2",
    "http/1.1"
  ],
  "skip-cert-verify": true
};

//添加负载均衡策略组
const addLoadBalanceGroup = (config) => {
  // 仅保留第一个相同 server 的项
  const uniqueProxies = Object.values(config.proxies.reduce((acc, proxy) => {
    if (!acc[proxy.server]) {
      acc[proxy.server] = proxy;
    }
    return acc;
  }, {}));
  add_hop_interval(config, 5) //给节点添加端口跳跃间隔
  console.log("profile 中的server\n", uniqueProxies)
  // 从 uniqueProxies 中提取所有 name
  const proxyNames = uniqueProxies.map(proxy => proxy.name);
  //strategy¶
  // 负载均衡策略
  // round-robin 将会把所有的请求分配给策略组内不同的代理节点 轮询
  // consistent-hashing 将相同的 目标地址 的请求分配给策略组内的同一个代理节点
  // sticky-sessions: 将相同的 来源地址 和 目标地址 的请求分配给策略组内的同一个代理节点，缓存 10 分钟过期
  // 创建 proxy-groups，其中包含从 uniqueProxies 提取的所有 name
 
  lbgroups = {
    "name": "轮询-负载均衡",
    "type": "load-balance",
    "proxies": proxyNames,
    "strategy": "round-robin",
    "url": url_test,
    "interval": 5,
  }
  lbgroups2 = {
    "name": "散列-负载均衡",
    "type": "load-balance",
    "proxies": proxyNames,
    "strategy": "consistent-hashing",
    "url": url_test,
    "interval": 5,
  }
  lbgroups3 = {
    "name": "sticky-sessions",
    "type": "load-balance",
    "proxies": proxyNames,
    "strategy": "sticky-sessions",
    "url": url_test,
    "interval": 5,
  }
  lbgroups4 = {
    "name": "Fast Delay",
    "type": "url-test",
    "proxies": proxyNames,
    "url": url_test,
    "interval": 5,
  }
  new_groups.push(lbgroups.name)
  new_groups.push(lbgroups2.name)
  new_groups.push(lbgroups3.name)
  new_groups.push(lbgroups4.name)
  //   一般第一个节点都是select类型的策略组，所以我们将负载均衡策略组添加到每个select类型的策略组的开头
  config["proxy-groups"].forEach(group => {
    if (group.type === "select") {
      group.proxies.unshift(lbgroups.name);  // 你可以根据需要修改 lb 的值
    }
  });
  config["proxy-groups"].forEach(group => {
    if (group.type === "select") {
      group.proxies.unshift(lbgroups2.name);  // 你可以根据需要修改 lb 的值
    }
  });
  config["proxy-groups"].forEach(group => {
    if (group.type === "select") {
      group.proxies.unshift(lbgroups3.name);  // 你可以根据需要修改 lb 的值
    }
  });
  // config["proxy-groups"].splice(1,0,lbgroups)
  // config["proxy-groups"].splice(1,0,lbgroups2)
  // config["proxy-groups"].splice(1,0,lbgroups3)
  // config["proxy-groups"].splice(1,0,lbgroups4)
  config["proxy-groups"].push(lbgroups)
  config["proxy-groups"].push(lbgroups2)
  config["proxy-groups"].push(lbgroups3)
  config["proxy-groups"].push(lbgroups4)

  dialer_proxy_clash_verge(config); //添加链式代理，中转自己的vps落地
  addLoadProxies(config, null); //添加节点
  rules_update(config); //更新规则
}

//给节点添加端口跳跃间隔 
const add_hop_interval = (config, seconds) => {
  config["proxies"].forEach(proxy => {
    if (proxy.type === "hysteria2") {
      proxy["hop-interval"] = seconds; // 设置端口跳跃间隔
    }
  });
  return config;
}

//添加节点 节点类型分为hysteria2,vless,vmess，trojan，shadowsocks，socks5，http，snell，wireguard，mtproto
const addLoadProxies = (config, proxy) => {

  const proxy_add = (config, proxy) => {
    config["proxy-groups"].forEach(group => {
      if (group.type === "select") {
        group.proxies.unshift(proxy.name);  // 你可以根据需要修改 lb 的值
      }
    });
    config["proxies"].push(proxy)
  }
  if (proxy == null) {
    proxy_add(config, proxy_hys2)
    proxy_add(config, proxy_hys2_ipv6)
    proxy_add(config, proxy_anytls)
    proxy_add(config, proxy_vless)
  } else proxy_add(config, proxy)

  // proxy_add(config,proxy_hys2)

  // config["proxies"].push(proxy_vless)

  return config;
}
// 没有特殊需求的情况下，在自己被中转的 VPS 落地中搭建的节点请勿选择任何 udp 类协议如 hy2/tuic/wg，
// 以及带有 tls 伪装类协议如 reality/shadowtls，您的订阅节点可能不能正常通过这些协议，这里建议选择最简单的 ss aead 或者 vmess 协议
const dialer_proxy_clash_verge = (config) => {
  // 仅保留第一个相同 server 的项
  const uniqueProxies = Object.values(config.proxies.reduce((acc, proxy) => {///\d/ 是判断字符串是否包含数字最快捷、最推荐的方法。您可以直接使用 .test() 方法，如果包含数字会返回 true，否则返回 false
    if (!acc[proxy.server] && (proxy.type == "vless" || proxy.type == "vmess")) {
      acc[proxy.server] = proxy;
    }
    return acc;
  }, {}));
  // const uniqueGroupsNames = Object.values(config["proxy-groups"].reduce((acc, group) => {///\d/ 是判断字符串是否包含数字最快捷、最推荐的方法。您可以直接使用 .test() 方法，如果包含数字会返回 true，否则返回 false
   
  //    acc[group.name] = group.name;
  //   return acc;
  // }, {}));

  const proxyNames = uniqueProxies.map(proxy => proxy.name);
  dialer = {
    "name": dialer_name,
    "type": "select",
    "proxies": [...new_groups, ...proxyNames],
  }
  //给每一个策略组加上dialer
  config["proxy-groups"].forEach(group => {
    if (group.type === "select") {
      group.proxies.unshift(dialer.name);  // 你可以根据需要修改 lb 的值
    }
  });
  // config["proxy-groups"].unshift(dialer)
  config["proxy-groups"].splice(1,0,dialer)
  //vless 节点示例 dialer-proxy



  const proxy_add = (config, proxy) => {
    config["proxy-groups"].forEach(group => {
      if (group.type === "select") {
        group.proxies.unshift(proxy.name);  // 你可以根据需要修改 lb 的值
      }
    });
    config["proxies"].push(proxy)
  }
  proxy_add(config, proxy_vless_50020)
  proxy_add(config, proxy_vmess_50023)
  // config.proxies = uniqueProxies;
  // return config;
}


const rules_update = (config) => {//替换所有为第一个手动选择
  // let group_name;
  const group=config["proxy-groups"].find(group => {
    if (group.type === "select") {
     return group;
    }
  });
const group_name = group ? group.name : null;
  if (Object.hasOwn(config, "rules") && config["rules"].length > 0)
    config["rules"][config["rules"].length - 1] = "MATCH," + group_name;

  //map() 必须有 return 语句。你必须把最终替换完的字符串 return 出来，map 才会把它组装成新数组。
  config["rules"]=config["rules"].map(item => {
  //   // 不生效
  //   item.replace(/♻️ 自动选择/g, group_name);
  //   item.replace(/🎯 全球直连/g, group_name);
  //   item.replace(/🔯 故障转移/g, group_name);
  //   item.replace(/🛑 全球拦截/g, group_name);
  //   item.replace(/🐟 漏网之鱼/g, group_name);
  //   item.replace(/☁️ CloudFlareCDN/g, group_name);

  return item
    .replace(/♻️\s*自动选择/g, group_name)
    // .replace(/🎯\s*全球直连/g, group_name)
    .replace(/🔯\s*故障转移/g, group_name)
    .replace(/🛑\s*全球拦截/g, group_name)
    .replace(/🐟\s*漏网之鱼/g, group_name)
    .replace(/☁️\s*CloudFlareCDN/g, group_name); // 最后一项分号结尾
  })

  // 方式2 匹配字符串 
  // 不知道为啥正则匹配去掉全球拦截，在clash meta中不生效，使用字符串复核。 Node.js是生效的
  config["rules"] = config["rules"].map(item => {
  const parts = item.split(",");
  if (parts[parts.length - 1].includes("自动选择")
    || parts[parts.length - 1].includes("故障转移")
    || parts[parts.length - 1].includes("全球拦截")
    || parts[parts.length - 1].includes("漏网之鱼") ||
    parts[parts.length - 1].includes("CloudFlareCDN")) {
    parts[parts.length - 1] = group_name; // 直接简单粗暴地赋值为你找到的组名

  }
  return parts.join(",");
})
};




filePath = 'profile.yaml'; // 替换为你的YAML文件路径
const fileContent = fs.readFileSync(filePath, 'utf8');
yaml_json = convertYamlToJson(fileContent)
console.log('转换后的JSON:\n', yaml_json);
try {
  // 2. 将对象转换为 YAML 格式的字符串
  const yamlString = yaml.dump(yaml_json);

  // 3. 将 YAML 字符串写入文件
  fs.writeFileSync('config.yaml', yamlString, 'utf8');
  console.log('YAML 文件写入成功！');
} catch (e) {
  console.error(e);
}

