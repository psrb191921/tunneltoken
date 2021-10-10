const RPCServer = require("./rpcserver.js").RPCServer;

class MasterNode {
	constructor(ip = "0.0.0.0", rpcPort = 5555) {
		this.ip = ip;
		this.rpcPort = rpcPort;
		this.rpcServer = new RPCServer(ip, rpcPort, this);
		this.masterNodes = {};
		this.nodes = {};
		return;
	}

	start() {
		this.rpcServer.start();
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