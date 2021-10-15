const RPCServer = require("./rpcserver.js").RPCServer;
const ProxyServer = require("./proxyserver.js").ProxyServer;

class MasterNode {
	constructor(host = "0.0.0.0", rpcPort = 5555) {
		this.host = host;
		this.rpcPort = rpcPort;
		this.rpcServer = new RPCServer(host, rpcPort, this);
		this.proxyServer = new ProxyServer(host, rpcPort, this);
		this.masterNodes = {};
		this.nodes = {};
		return;
	}

	start() {
		this.rpcServer.start();
		this.proxyServer.start();
		return;
	}

	getInfo(query) {
		return {
			"version": 0.1
		};
	}

	addNode(query) {
		return {
			"result": "ok"
		};
	}
}

(new MasterNode()).start();