const http = require("http");
const URL = require("url").URL;

class RPCServer {
	constructor(host = "0.0.0.0", port = 5555, masterNode) {
		this.host = host;
		this.port = port;
		this.masterNode = masterNode;
		this.handlers = {};
		return;
	}

	addHandler(path, handler) {
		this.handlers[path] = handler;
		return;
	}

	getHandler(path) {
		return this.handlers[path];
	}

	setupHandlers() {
		this.addHandler("/info", this.onInfo.bind(this));
		this.addHandler("/register", this.onRegister.bind(this));
		return;
	}

	createServer() {
		let server = http.createServer(
			this.onRequest.bind(this)
		);
		server.listen(
			this.port
		);
		return server;
	}

	start() {
		this.setupHandlers();
		this.server = this.createServer();
		return;
	}

	onRequest(request, response) {
		try {
			let url = new URL(
				request.url,
				"http://" + this.host + ":" + this.port
			);
			let handler = this.getHandler(url.pathname);
			if (!handler) {
				throw { "error": "nosuchhandler" };
			}
			let query = Object.fromEntries(
				url.searchParams.entries()
			);
			response.end(
				JSON.stringify(
					handler(
						query
					)
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

	onInfo(query) {
		return this.server.getInfo(
			query
		);
	}

	onRegister(query) {
		return this.server.addNode(
			query
		);
	}
}

module.exports = { RPCServer };