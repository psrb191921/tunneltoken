const net = require("net");
const Node = require("./node.js").Node;

class ProxyServer {
	constructor(host = "0.0.0.0", nodePort = 6666, clientPort = 7777, masterNode) {
		this.host = host;
		this.nodePort = nodePort;
		this.clientPort = clientPort;
		this.masterNode = masterNode;
		this.nodes = {};
		return;
	}

	createServer(host, port, connectionsHandler) {
		let server = net.createServer(
			connectionsHandler
		);
		server.listen(
			{
				"host": host,
				"port": port
			}
		);
		return server;
	}

	start() {
		this.nodeServer = this.createServer(
			this.host,
			this.nodePort,
			this.onNodeConnection.bind(this)
		);
		this.clientServer = this.createServer(
			this.host,
			this.clientPort,
			this.onClientConnection.bind(this)
		);
		return;
	}

	onNodeConnection(socket) {
		(new Node(socket)).start();
		return;
	}

	onClientConnection(socket) {
		return;
	}
}

module.exports = { ProxyServer };