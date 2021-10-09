const http = require("http");

class MasterNode {
	constructor(ip = "0.0.0.0", port = 5555) {
		this.ip = ip;
		this.port = port;
		this.rpcHandlers = {};
		this.masterNodes = {};
		this.nodes = {};
		return;
	}

	addRpcHandler(path, handler) {
		this.rpcHandlers[path] = handler;
		return;
	}

	getRpcHandler(path) {
		return this.rpcHandlers[path];
	}

	setupRpcHandlers() {
		this.addRpcHandler("/info", this.onRpcInfo);
		this.addRpcHandler("/register", this.onRpcRegister);
		return;
	}

	createRpcServer() {
		let server = http.createServer(
			this.onRpcRequest.bind(this)
		);
		server.listen(
			this.port
		);
		return server;
	}

	start() {
		this.setupRpcHandlers();
		this.rpcServer = this.createRpcServer();
		return;
	}

	onRpcRequest(request, response) {
		try {
			let handler = this.getRpcHandler(request.url);
			if (!handler) {
				throw { "error": "nosuchhandler" };
			}
			return handler(request, response);
		}
		catch (error) {
			response.end(
				JSON.stringify(error)
			);
		}
		return;
	}

	onRpcInfo(request, response) {
		response.end(
			JSON.stringify({ "version": 0.1 })
		);
		return;
	}

	onRpcRegister(request, response) {
		return;
	}
}

(new MasterNode()).start();