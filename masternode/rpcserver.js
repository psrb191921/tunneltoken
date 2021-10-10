const http = require("http");

class RPCServer {
	constructor(ip = "0.0.0.0", port = 5555, server) {
		this.ip = ip;
		this.port = port;
		this.server = server;
		this.rpcHandlers = {};
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
			response.end(
				JSON.stringify(
					handler(request)
				)
			);
		}
		catch (error) {
			response.end(
				JSON.stringify(error)
			);
		}
		return;
	}

	onRpcInfo(request) {
		return this.server.getInfo();
	}

	onRpcRegister(request) {
		return this.server.addNode();
	}
}

module.exports = { RPCServer };