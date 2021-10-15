const net = require("net");

class Node {
	constructor(host = "0.0.0.0", socket, proxyServer) {
		this.host = host;
		this.socket = socket;
		this.proxyServer = proxyServer;
		return;
	}

	createServer(host, listeningHandler, connectionsHandler) {
		let server = net.createServer(
			connectionsHandler
		);
		server.on(
			"listening",
			listeningHandler
		);
		server.listen();
		return server;
	}

	start() {
		this.server = this.createServer(
			this.host,
			this.onListening.bind(this),
			this.onConnection.bind(this)
		);
		return;
	}

	onListening() {
		this.port = this.server.address().port;
		return;
	}

	onConnection(socket) {
		return;
	}
}

module.exports = { Node };