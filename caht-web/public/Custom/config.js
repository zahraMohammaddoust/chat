function config(){
    function ConfigManager() {
        this.RootAddress = "https://172.20.10.2:7269/api";
    }
    var Config = new ConfigManager();
    return Config;
}