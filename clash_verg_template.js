// 全局拓展脚本
// Define main function (script entry)
function main(config, profileName) {
    addLoadBalanceGroup(config);
    return config;
}